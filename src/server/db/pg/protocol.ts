/**
 * Mã hóa / giải mã thông điệp giao thức PostgreSQL v3 (frontend/backend protocol).
 * Tài liệu: https://www.postgresql.org/docs/current/protocol-message-formats.html
 */

export class Writer {
  private chunks: Buffer[] = [];
  private size = 0;

  int8(v: number) { const b = Buffer.alloc(1); b.writeUInt8(v); return this.push(b); }
  int16(v: number) { const b = Buffer.alloc(2); b.writeInt16BE(v); return this.push(b); }
  int32(v: number) { const b = Buffer.alloc(4); b.writeInt32BE(v); return this.push(b); }
  cstring(s: string) { return this.push(Buffer.concat([Buffer.from(s, 'utf8'), Buffer.from([0])])); }
  bytes(b: Buffer) { return this.push(b); }

  private push(b: Buffer) { this.chunks.push(b); this.size += b.length; return this; }

  /** Đóng gói thành một thông điệp: [mã 1 byte] + độ dài int32 (gồm cả 4 byte độ dài) + nội dung. */
  message(code?: string): Buffer {
    const body = Buffer.concat(this.chunks, this.size);
    const header = Buffer.alloc(code ? 5 : 4);
    if (code) {
      header.write(code, 0, 'ascii');
      header.writeInt32BE(body.length + 4, 1);
    } else {
      header.writeInt32BE(body.length + 4, 0);
    }
    return Buffer.concat([header, body]);
  }
}

export function startupMessage(params: Record<string, string>): Buffer {
  const w = new Writer().int32(196608); // phiên bản giao thức 3.0
  for (const [k, v] of Object.entries(params)) w.cstring(k).cstring(v);
  w.int8(0);
  return w.message();
}

export function sslRequest(): Buffer {
  return new Writer().int32(80877103).message();
}

export function passwordMessage(payload: string | Buffer): Buffer {
  const w = new Writer();
  if (typeof payload === 'string') w.cstring(payload);
  else w.bytes(payload);
  return w.message('p');
}

export function saslInitialResponse(mechanism: string, data: string): Buffer {
  const buf = Buffer.from(data, 'utf8');
  return new Writer().cstring(mechanism).int32(buf.length).bytes(buf).message('p');
}

export function parseMessage(text: string): Buffer {
  return new Writer().cstring('').cstring(text).int16(0).message('P');
}

export function bindMessage(values: (string | null)[]): Buffer {
  const w = new Writer().cstring('').cstring('').int16(0).int16(values.length);
  for (const v of values) {
    if (v === null) {
      w.int32(-1);
    } else {
      const b = Buffer.from(v, 'utf8');
      w.int32(b.length).bytes(b);
    }
  }
  w.int16(0); // mọi cột kết quả ở dạng văn bản
  return w.message('B');
}

export function describePortalMessage(): Buffer {
  return new Writer().int8('P'.charCodeAt(0)).cstring('').message('D');
}

export function executeMessage(): Buffer {
  return new Writer().cstring('').int32(0).message('E');
}

export function syncMessage(): Buffer {
  return new Writer().message('S');
}

export function queryMessage(text: string): Buffer {
  return new Writer().cstring(text).message('Q');
}

export function terminateMessage(): Buffer {
  return new Writer().message('X');
}

/** Đọc chuỗi kết thúc bằng byte 0 từ vị trí offset. */
export function readCString(buf: Buffer, offset: number): [string, number] {
  const end = buf.indexOf(0, offset);
  if (end < 0) return [buf.toString('utf8', offset), buf.length];
  return [buf.toString('utf8', offset, end), end + 1];
}

export interface FieldInfo {
  name: string;
  typeOid: number;
}

export function parseRowDescription(body: Buffer): FieldInfo[] {
  const count = body.readInt16BE(0);
  let off = 2;
  const fields: FieldInfo[] = [];
  for (let i = 0; i < count; i++) {
    const [name, next] = readCString(body, off);
    off = next;
    off += 4; // table oid
    off += 2; // column attr number
    const typeOid = body.readInt32BE(off);
    off += 4;
    off += 2; // type size
    off += 4; // type modifier
    off += 2; // format code
    fields.push({ name, typeOid });
  }
  return fields;
}

export function parseDataRow(body: Buffer): (string | null)[] {
  const count = body.readInt16BE(0);
  let off = 2;
  const values: (string | null)[] = [];
  for (let i = 0; i < count; i++) {
    const len = body.readInt32BE(off);
    off += 4;
    if (len < 0) {
      values.push(null);
    } else {
      values.push(body.toString('utf8', off, off + len));
      off += len;
    }
  }
  return values;
}

export interface PgErrorFields {
  severity?: string;
  code?: string;
  message?: string;
  detail?: string;
  hint?: string;
  position?: string;
  table?: string;
  column?: string;
  constraint?: string;
}

const ERROR_FIELD_NAMES: Record<string, keyof PgErrorFields> = {
  S: 'severity',
  C: 'code',
  M: 'message',
  D: 'detail',
  H: 'hint',
  P: 'position',
  t: 'table',
  c: 'column',
  n: 'constraint',
};

export function parseErrorFields(body: Buffer): PgErrorFields {
  const out: PgErrorFields = {};
  let off = 0;
  while (off < body.length) {
    const code = body[off];
    if (code === 0) break;
    const [value, next] = readCString(body, off + 1);
    off = next;
    const key = ERROR_FIELD_NAMES[String.fromCharCode(code)];
    if (key) out[key] = value;
  }
  return out;
}

export class PgError extends Error {
  code?: string;
  detail?: string;
  hint?: string;
  constraint?: string;
  table?: string;
  column?: string;
  severity?: string;
  constructor(fields: PgErrorFields) {
    super(fields.message ?? 'Lỗi PostgreSQL không xác định');
    this.name = 'PgError';
    Object.assign(this, fields);
  }
}
