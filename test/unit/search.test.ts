/** Tìm kiếm kiến thức không dấu: so khớp đầu từ, ưu tiên cụm từ liền nhau. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { foldVi, searchEntries, type SearchEntry } from '../../src/shared/search';

const E = (kind: SearchEntry['kind'], title: string, body = ''): SearchEntry => ({ kind, title, context: '', snippet: '', href: title, text: foldVi(body) });

test('tìm kiếm: gõ không dấu, ưu tiên cụm từ đúng thứ tự', () => {
  const entries = [
    E('lesson', 'Bài 33. Hai tam giác đồng dạng', 'Định nghĩa hai tam giác đồng dạng, tỉ số đồng dạng; đơn vị đo'),
    E('lesson', 'Bài 1. Đơn thức', 'Đơn thức thu gọn, bậc của đơn thức, cộng trừ đơn thức đồng dạng'),
    E('formula', 'Bình phương của một tổng', '(A + B)^2'),
  ];
  const r = searchEntries(entries, 'don thuc dong dang');
  assert.equal(r[0].title, 'Bài 1. Đơn thức');
  assert.equal(searchEntries(entries, 'hằng đẳng thức').length, 0);
  assert.deepEqual(searchEntries(entries, 'binh phuong').map((x) => x.title), ['Bình phương của một tổng']);
  // "don" phải khớp đầu từ: không khớp giữa từ
  assert.equal(searchEntries([E('topic', 'Tìm x', 'london')], 'don').length, 0);
});
