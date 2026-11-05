/** Đọc biểu mẫu multipart/form-data (tải ảnh lên). Chỉ dùng cho biểu mẫu nhỏ: toàn bộ thân yêu cầu đã nằm trong bộ nhớ. */
export interface UploadedFile {
  field: string;
  filename: string;
  type: string;
  data: Buffer;
}

export function parseMultipart(body: Buffer, contentType: string): { fields: URLSearchParams; files: UploadedFile[] } {
  const m = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType);
  if (!m) throw new Error('Thiếu boundary của multipart.');
  const boundary = Buffer.from(`--${(m[1] ?? m[2]).trim()}`);
  const fields = new URLSearchParams();
  const files: UploadedFile[] = [];
  let pos = body.indexOf(boundary);
  if (pos < 0) throw new Error('Dữ liệu multipart không hợp lệ.');
  for (let guard = 0; guard < 200; guard++) {
    pos += boundary.length;
    if (body.subarray(pos, pos + 2).toString() === '--') break; // kết thúc
    if (body.subarray(pos, pos + 2).toString() === '\r\n') pos += 2;
    const headerEnd = body.indexOf('\r\n\r\n', pos);
    if (headerEnd < 0) throw new Error('Dữ liệu multipart không hợp lệ.');
    const headers = body.subarray(pos, headerEnd).toString('utf8');
    const next = body.indexOf(boundary, headerEnd + 4);
    if (next < 0) throw new Error('Dữ liệu multipart không hợp lệ.');
    let data = body.subarray(headerEnd + 4, next);
    if (data.subarray(data.length - 2).toString() === '\r\n') data = data.subarray(0, data.length - 2);
    const disp = /content-disposition:[^\r\n]*/i.exec(headers)?.[0] ?? '';
    const name = /\bname="([^"]*)"/i.exec(disp)?.[1];
    const filename = /\bfilename="([^"]*)"/i.exec(disp)?.[1];
    const type = /content-type:\s*([^\r\n;]+)/i.exec(headers)?.[1]?.trim().toLowerCase() ?? 'application/octet-stream';
    if (name !== undefined) {
      if (filename !== undefined) {
        if (data.length) files.push({ field: name, filename, type, data: Buffer.from(data) });
      } else fields.append(name, data.toString('utf8'));
    }
    pos = next;
  }
  return { fields, files };
}

/** Nhận dạng ảnh theo vài byte đầu (không tin phần mở rộng hay Content-Type trình duyệt gửi). */
export function sniffImage(data: Buffer): 'image/png' | 'image/jpeg' | 'image/webp' | null {
  if (data.length > 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return 'image/jpeg';
  if (data.length > 12 && data.subarray(0, 4).toString('latin1') === 'RIFF' && data.subarray(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
  return null;
}
