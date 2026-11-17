import type { BankLesson } from './types';
import { BANK_CHUONG_1 } from './chuong-1';
import { BANK_CHUONG_2 } from './chuong-2';

/** Ngân hàng câu hỏi giai đoạn 4, theo thứ tự bài trong SGK. */
export const TOAN8_BANK: BankLesson[] = [...BANK_CHUONG_1, ...BANK_CHUONG_2];
