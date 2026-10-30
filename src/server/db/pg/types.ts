/**
 * Chuyển giá trị dạng văn bản PostgreSQL ↔ giá trị JavaScript.
 */

const INT_TYPES = new Set([21, 23, 26]);
const FLOAT_TYPES = new Set([700, 701]);

/** Mảng một chiều: {1,2,"a b",NULL} */
export function parseArrayLiteral(text: string): (string | null)[] {
  const out: (string | null)[] = [];
  if (text.length < 2) return out;
  let i = 1; // bỏ dấu {
  const end = text.length - 1;
  while (i < end) {
    if (text[i] === '"') {
      i++;
      let s = '';
      while (i < end && text[i] !== '"') {
        if (text[i] === '\\') i++;
        s += text[i];
        i++;
      }
      i++; // dấu " đóng
      out.push(s);
    } else {
      let s = '';
      while (i < end && text[i] !== ',') s += text[i++];
      out.push(s === 'NULL' ? null : s);
    }
    if (text[i] === ',') i++;
  }
  return out;
}

function parseTimestamp(text: string): Date {
  // Dạng ISO từ PostgreSQL: 2026-10-30 15:05:01.123456+00 hoặc +07:00
  const m = /^(\d{4,})-(\d\d)-(\d\d)[ T](\d\d):(\d\d):(\d\d)(\.\d+)?(?:([+-])(\d\d)(?::?(\d\d))?(?::?(\d\d))?)?$/.exec(text);
  if (!m) return new Date(text);
  const ms = m[7] ? Math.round(Number(m[7]) * 1000) : 0;
  let t = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6], ms);
  if (m[8]) {
    const sign = m[8] === '+' ? 1 : -1;
    const offsetMin = (+m[9]) * 60 + (m[10] ? +m[10] : 0) + (m[11] ? +m[11] / 60 : 0);
    t -= sign * offsetMin * 60_000;
  }
  return new Date(t);
}

function parseScalar(oid: number, text: string): unknown {
  if (INT_TYPES.has(oid)) return parseInt(text, 10);
  if (FLOAT_TYPES.has(oid)) return parseFloat(text);
  switch (oid) {
    case 16:
      return text === 't';
    case 20: {
      const n = Number(text);
      return Number.isSafeInteger(n) ? n : text;
    }
    case 1700:
      return Number(text);
    case 114:
    case 3802:
      return JSON.parse(text);
    case 1114:
    case 1184:
      return parseTimestamp(text);
    case 17:
      return text.startsWith('\\x') ? Buffer.from(text.slice(2), 'hex') : Buffer.from(text, 'binary');
    default:
      return text;
  }
}

const ARRAY_ELEMENT: Record<number, number> = {
  1000: 16, // bool[]
  1005: 21, // int2[]
  1007: 23, // int4[]
  1016: 20, // int8[]
  1009: 25, // text[]
  1015: 1043, // varchar[]
  1021: 700,
  1022: 701,
  1231: 1700,
  2951: 2950, // uuid[]
  1185: 1184,
};

export function parseValue(oid: number, text: string | null): unknown {
  if (text === null) return null;
  const elementOid = ARRAY_ELEMENT[oid];
  if (elementOid !== undefined) {
    return parseArrayLiteral(text).map((v) => (v === null ? null : parseScalar(elementOid, v)));
  }
  return parseScalar(oid, text);
}

/** Gói giá trị để gửi dưới dạng JSON (dùng cho cột json/jsonb khi giá trị là mảng). */
export class JsonValue {
  constructor(public readonly value: unknown) {}
}

function escapeArrayElement(v: unknown): string {
  if (v === null || v === undefined) return 'NULL';
  const s = serializeValue(v) as string;
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

export function serializeValue(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  if (v instanceof JsonValue) return JSON.stringify(v.value);
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'boolean') return v ? 't' : 'f';
  if (typeof v === 'number') {
    if (!Number.isFinite(v)) throw new TypeError('Không gửi được số không hữu hạn tới PostgreSQL');
    return String(v);
  }
  if (typeof v === 'bigint') return v.toString();
  if (typeof v === 'string') return v;
  if (Buffer.isBuffer(v)) return '\\x' + v.toString('hex');
  if (Array.isArray(v)) return '{' + v.map(escapeArrayElement).join(',') + '}';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
