import net from 'node:net';
import tls from 'node:tls';
import crypto from 'node:crypto';
import {
  FieldInfo,
  PgError,
  bindMessage,
  describePortalMessage,
  executeMessage,
  parseDataRow,
  parseErrorFields,
  parseMessage,
  parseRowDescription,
  passwordMessage,
  queryMessage,
  readCString,
  saslInitialResponse,
  sslRequest,
  startupMessage,
  syncMessage,
  terminateMessage,
} from './protocol';
import { parseValue, serializeValue } from './types';

export interface PgConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  /** false: không mã hóa. Đối tượng: bật TLS (rejectUnauthorized=false tương ứng sslmode=require). */
  ssl: false | { rejectUnauthorized: boolean; ca?: string };
  connectTimeoutMs?: number;
  statementTimeoutMs?: number;
  applicationName?: string;
}

export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
  rowCount: number;
  command: string;
  fields: FieldInfo[];
}

type Handler = (code: string, body: Buffer) => void;

/** Phân tích DATABASE_URL kiểu postgres://user:pass@host:5432/db?sslmode=require */
export function parseDatabaseUrl(url: string): PgConfig {
  const u = new URL(url);
  if (u.protocol !== 'postgres:' && u.protocol !== 'postgresql:') {
    throw new Error('DATABASE_URL phải bắt đầu bằng postgres:// hoặc postgresql://');
  }
  const sslmode = u.searchParams.get('sslmode') ?? (u.searchParams.get('ssl') === 'true' ? 'require' : 'disable');
  let ssl: PgConfig['ssl'] = false;
  if (sslmode === 'require' || sslmode === 'prefer' || sslmode === 'no-verify') ssl = { rejectUnauthorized: false };
  if (sslmode === 'verify-ca' || sslmode === 'verify-full') ssl = { rejectUnauthorized: true };
  return {
    host: decodeURIComponent(u.hostname) || 'localhost',
    port: u.port ? Number(u.port) : 5432,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: decodeURIComponent(u.pathname.replace(/^\//, '')) || decodeURIComponent(u.username),
    ssl,
  };
}

function hmac(key: Buffer, data: string | Buffer) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function xor(a: Buffer, b: Buffer) {
  const out = Buffer.alloc(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}

/** SCRAM-SHA-256 (RFC 5802 / RFC 7677) – cơ chế xác thực mặc định từ PostgreSQL 14. */
class Scram {
  private clientNonce = crypto.randomBytes(18).toString('base64');
  private clientFirstBare = `n=*,r=${this.clientNonce}`;
  private expectedServerSignature: Buffer | null = null;

  clientFirst() {
    return `n,,${this.clientFirstBare}`;
  }

  clientFinal(serverFirst: string, password: string): string {
    const attrs = Object.fromEntries(
      serverFirst.split(',').map((p) => [p.slice(0, 1), p.slice(2)] as [string, string]),
    );
    const nonce = attrs.r;
    if (!nonce || !nonce.startsWith(this.clientNonce)) throw new Error('SCRAM: nonce của máy chủ không hợp lệ');
    const salt = Buffer.from(attrs.s ?? '', 'base64');
    const iterations = Number(attrs.i);
    if (!salt.length || !Number.isFinite(iterations) || iterations < 1) throw new Error('SCRAM: thông số không hợp lệ');
    const saltedPassword = crypto.pbkdf2Sync(password.normalize('NFKC'), salt, iterations, 32, 'sha256');
    const clientKey = hmac(saltedPassword, 'Client Key');
    const storedKey = crypto.createHash('sha256').update(clientKey).digest();
    const clientFinalWithoutProof = `c=biws,r=${nonce}`;
    const authMessage = `${this.clientFirstBare},${serverFirst},${clientFinalWithoutProof}`;
    const clientSignature = hmac(storedKey, authMessage);
    const proof = xor(clientKey, clientSignature).toString('base64');
    const serverKey = hmac(saltedPassword, 'Server Key');
    this.expectedServerSignature = hmac(serverKey, authMessage);
    return `${clientFinalWithoutProof},p=${proof}`;
  }

  verify(serverFinal: string) {
    const m = /(?:^|,)v=([^,]+)/.exec(serverFinal);
    if (!m || !this.expectedServerSignature) throw new Error('SCRAM: thiếu chữ ký máy chủ');
    const got = Buffer.from(m[1], 'base64');
    if (got.length !== this.expectedServerSignature.length || !crypto.timingSafeEqual(got, this.expectedServerSignature)) {
      throw new Error('SCRAM: chữ ký máy chủ không khớp');
    }
  }
}

function toCamel(name: string) {
  return name.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

export class PgConnection {
  private socket!: net.Socket;
  private buffer: Buffer = Buffer.alloc(0);
  private handler: Handler | null = null;
  private fail: ((err: Error) => void) | null = null;
  private busy = false;
  dead = false;
  parameters: Record<string, string> = {};
  onClose: (() => void) | null = null;

  constructor(private readonly cfg: PgConfig) {}

  async connect(): Promise<void> {
    const timeout = this.cfg.connectTimeoutMs ?? 10_000;
    let socket: net.Socket = await new Promise((resolve, reject) => {
      const s = net.connect({ host: this.cfg.host, port: this.cfg.port });
      const timer = setTimeout(() => {
        s.destroy();
        reject(new Error(`Không kết nối được PostgreSQL tại ${this.cfg.host}:${this.cfg.port} (quá ${timeout} ms)`));
      }, timeout);
      s.once('connect', () => {
        clearTimeout(timer);
        resolve(s);
      });
      s.once('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
    socket.setNoDelay(true);
    socket.setKeepAlive(true, 30_000);

    if (this.cfg.ssl) {
      const answer: string = await new Promise((resolve, reject) => {
        socket.once('data', (d: Buffer) => resolve(String.fromCharCode(d[0])));
        socket.once('error', reject);
        socket.write(sslRequest());
      });
      if (answer !== 'S') {
        socket.destroy();
        throw new Error('Máy chủ PostgreSQL không hỗ trợ kết nối SSL (sslmode yêu cầu SSL)');
      }
      const ssl = this.cfg.ssl;
      socket = await new Promise<net.Socket>((resolve, reject) => {
        const t = tls.connect({
          socket,
          servername: net.isIP(this.cfg.host) ? undefined : this.cfg.host,
          rejectUnauthorized: ssl.rejectUnauthorized,
          ca: ssl.ca,
        });
        t.once('secureConnect', () => resolve(t));
        t.once('error', reject);
      });
    }

    this.socket = socket;
    socket.on('data', (chunk: Buffer) => this.onData(chunk));
    socket.on('error', (err) => this.terminate(err));
    socket.on('close', () => this.terminate(new Error('Kết nối PostgreSQL đã đóng')));
    await this.startup();
  }

  private terminate(err: Error) {
    if (this.dead) return;
    this.dead = true;
    const fail = this.fail;
    this.fail = null;
    this.handler = null;
    if (fail) fail(err);
    this.onClose?.();
  }

  private onData(chunk: Buffer) {
    this.buffer = this.buffer.length ? Buffer.concat([this.buffer, chunk]) : chunk;
    let off = 0;
    while (this.buffer.length - off >= 5) {
      const code = String.fromCharCode(this.buffer[off]);
      const len = this.buffer.readInt32BE(off + 1);
      if (this.buffer.length - off < len + 1) break;
      const body = this.buffer.subarray(off + 5, off + 1 + len);
      off += len + 1;
      if (code === 'N' || code === 'A') continue; // NoticeResponse / NotificationResponse
      if (code === 'S' && !this.busy) {
        const [k, next] = readCString(body, 0);
        const [v] = readCString(body, next);
        this.parameters[k] = v;
        continue;
      }
      try {
        this.handler?.(code, body);
      } catch (err) {
        this.terminate(err as Error);
        this.socket.destroy();
        return;
      }
    }
    this.buffer = off === this.buffer.length ? Buffer.alloc(0) : this.buffer.subarray(off);
  }

  private startup(): Promise<void> {
    return new Promise((resolve, reject) => {
      let scram: Scram | null = null;
      this.fail = reject;
      this.busy = true;
      this.handler = (code, body) => {
        switch (code) {
          case 'R': {
            const kind = body.readInt32BE(0);
            if (kind === 0) return; // AuthenticationOk
            if (kind === 3) {
              this.socket.write(passwordMessage(this.cfg.password));
              return;
            }
            if (kind === 5) {
              const salt = body.subarray(4, 8);
              const inner = crypto.createHash('md5').update(this.cfg.password + this.cfg.user).digest('hex');
              const outer = crypto.createHash('md5').update(Buffer.concat([Buffer.from(inner), salt])).digest('hex');
              this.socket.write(passwordMessage('md5' + outer));
              return;
            }
            if (kind === 10) {
              const mechanisms: string[] = [];
              let off = 4;
              while (off < body.length && body[off] !== 0) {
                const [m, next] = readCString(body, off);
                mechanisms.push(m);
                off = next;
              }
              if (!mechanisms.includes('SCRAM-SHA-256')) throw new Error('Máy chủ yêu cầu cơ chế xác thực chưa hỗ trợ: ' + mechanisms.join(', '));
              scram = new Scram();
              this.socket.write(saslInitialResponse('SCRAM-SHA-256', scram.clientFirst()));
              return;
            }
            if (kind === 11) {
              if (!scram) throw new Error('SCRAM: trạng thái không hợp lệ');
              const final = scram.clientFinal(body.subarray(4).toString('utf8'), this.cfg.password);
              this.socket.write(passwordMessage(Buffer.from(final, 'utf8')));
              return;
            }
            if (kind === 12) {
              scram?.verify(body.subarray(4).toString('utf8'));
              return;
            }
            throw new Error(`Cơ chế xác thực PostgreSQL chưa hỗ trợ (mã ${kind})`);
          }
          case 'S': {
            const [k, next] = readCString(body, 0);
            const [v] = readCString(body, next);
            this.parameters[k] = v;
            return;
          }
          case 'K':
            return;
          case 'E':
            this.handler = null;
            this.fail = null;
            this.busy = false;
            reject(new PgError(parseErrorFields(body)));
            this.socket.destroy();
            return;
          case 'Z':
            this.handler = null;
            this.fail = null;
            this.busy = false;
            resolve();
            return;
        }
      };
      const params: Record<string, string> = {
        user: this.cfg.user,
        database: this.cfg.database,
        client_encoding: 'UTF8',
        DateStyle: 'ISO, MDY',
        TimeZone: 'UTC',
        application_name: this.cfg.applicationName ?? 'math-learning',
      };
      if (this.cfg.statementTimeoutMs) params.statement_timeout = String(this.cfg.statementTimeoutMs);
      this.socket.write(startupMessage(params));
    });
  }

  /** Truy vấn có tham số ($1, $2…) qua extended protocol – chống SQL injection. */
  query<T = Record<string, unknown>>(text: string, values: unknown[] = []): Promise<QueryResult<T>> {
    if (this.dead) return Promise.reject(new Error('Kết nối PostgreSQL đã đóng'));
    if (this.busy) return Promise.reject(new Error('Kết nối đang bận (lỗi lập trình: dùng chung kết nối)'));
    let serialized: (string | null)[];
    try {
      serialized = values.map(serializeValue);
    } catch (err) {
      return Promise.reject(err);
    }
    return this.run<T>(Buffer.concat([parseMessage(text), bindMessage(serialized), describePortalMessage(), executeMessage(), syncMessage()]));
  }

  /** Simple query protocol: cho phép nhiều câu lệnh (dùng cho migration). */
  simpleQuery(text: string): Promise<QueryResult> {
    if (this.dead) return Promise.reject(new Error('Kết nối PostgreSQL đã đóng'));
    return this.run(queryMessage(text));
  }

  private run<T>(payload: Buffer): Promise<QueryResult<T>> {
    return new Promise((resolve, reject) => {
      let fields: FieldInfo[] = [];
      let keys: string[] = [];
      const rows: T[] = [];
      let rowCount = 0;
      let command = '';
      let error: PgError | null = null;
      this.busy = true;
      this.fail = (err) => {
        this.busy = false;
        reject(err);
      };
      this.handler = (code, body) => {
        switch (code) {
          case 'T':
            fields = parseRowDescription(body);
            keys = fields.map((f) => toCamel(f.name));
            return;
          case 'D': {
            const raw = parseDataRow(body);
            const row: Record<string, unknown> = {};
            for (let i = 0; i < raw.length; i++) row[keys[i]] = parseValue(fields[i].typeOid, raw[i]);
            rows.push(row as T);
            return;
          }
          case 'C': {
            const [tag] = readCString(body, 0);
            command = tag.split(' ')[0];
            const n = Number(tag.split(' ').pop());
            rowCount = Number.isFinite(n) ? n : 0;
            return;
          }
          case 'E':
            error = new PgError(parseErrorFields(body));
            return;
          case 'S':
            return;
          case 'Z':
            this.handler = null;
            this.fail = null;
            this.busy = false;
            if (error) reject(error);
            else resolve({ rows, rowCount, command, fields });
            return;
          default:
            return; // 1 ParseComplete, 2 BindComplete, n NoData, I EmptyQuery, s PortalSuspended
        }
      };
      this.socket.write(payload);
    });
  }

  close(): Promise<void> {
    if (this.dead) return Promise.resolve();
    return new Promise((resolve) => {
      this.socket.once('close', () => resolve());
      try {
        this.socket.end(terminateMessage());
      } catch {
        resolve();
      }
      setTimeout(() => {
        this.socket.destroy();
        resolve();
      }, 1000).unref();
    });
  }
}
