import type { BankLesson } from './types';
import { BANK_CHUONG_1 } from './chuong-1';
import { BANK_CHUONG_2 } from './chuong-2';
import { BANK_CHUONG_3 } from './chuong-3';
import { BANK_CHUONG_4 } from './chuong-4';
import { BANK_CHUONG_5 } from './chuong-5';

/** Ngân hàng câu hỏi giai đoạn 4, theo thứ tự bài trong SGK. */
export const TOAN8_BANK: BankLesson[] = [...BANK_CHUONG_1, ...BANK_CHUONG_2, ...BANK_CHUONG_3, ...BANK_CHUONG_4, ...BANK_CHUONG_5];
