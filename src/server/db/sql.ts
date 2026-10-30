import { JsonValue } from './pg/types';

/**
 * Câu SQL dựng bằng template tag: mọi giá trị chèn vào đều trở thành tham số $n,
 * không bao giờ được nối thẳng vào chuỗi SQL.
 *
 *   sql`select * from users where id = ${id}`
 */
export class SqlFragment {
  constructor(
    readonly strings: readonly string[],
    readonly values: readonly unknown[],
  ) {}

  compile(): { text: string; values: unknown[] } {
    const values: unknown[] = [];
    const text = this.build(values);
    return { text, values };
  }

  private build(values: unknown[]): string {
    let text = this.strings[0];
    for (let i = 0; i < this.values.length; i++) {
      const v = this.values[i];
      if (v instanceof SqlFragment) {
        text += v.build(values);
      } else if (v instanceof RawSql) {
        text += v.text;
      } else {
        values.push(v);
        text += '$' + values.length;
      }
      text += this.strings[i + 1];
    }
    return text;
  }
}

class RawSql {
  constructor(readonly text: string) {}
}

export function sql(strings: TemplateStringsArray, ...values: unknown[]): SqlFragment {
  return new SqlFragment(strings, values);
}

/** Chèn nguyên văn – CHỈ dùng với chuỗi do lập trình viên viết sẵn (tên cột trong danh sách trắng). */
sql.raw = (text: string) => new SqlFragment(['', ''], [new RawSql(text)]);

sql.empty = new SqlFragment([''], []);

sql.join = (parts: SqlFragment[], separator = ', '): SqlFragment => {
  if (!parts.length) return sql.empty;
  const strings = [''];
  for (let i = 1; i < parts.length; i++) strings.push(separator);
  strings.push('');
  return new SqlFragment(strings, parts);
};

/** Giá trị gửi đi dạng JSON (cần khi ghi mảng JS vào cột jsonb). */
sql.json = (value: unknown) => new JsonValue(value);
