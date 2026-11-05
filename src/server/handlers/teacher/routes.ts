import type { Router } from '../../http/router';
import { teacherHome } from './overview';
import { classAction, classDetailPage, classesPage, createClassAction, studentResetAction, studentsPage } from './classes';
import { uploadImageAction } from './lesson-v3-editor';
import { chapterEditorAction, chapterEditorPage, curriculumAction, curriculumAdminPage, lessonEditorAction, lessonEditorPage, topicEditorAction, topicEditorPage } from './content';
import { importPage, importAction, importTemplate } from './import';
import {
  createQuestionAction,
  deleteQuestionAction,
  duplicateQuestionAction,
  editQuestionPage,
  newQuestionPage,
  previewQuestionPage,
  questionBankPage,
  updateQuestionAction,
} from './questions';
import { createTestAction, gradingAction, gradingPage, testAction, testDetailPage, testQuestionAction, testResultsPage, testsPage } from './tests';
import { statsPage } from './stats';

export function registerTeacherRoutes(r: Router) {
  r.get('/giao-vien', teacherHome);
  r.get('/giao-vien/lop', (ctx) => classesPage(ctx));
  r.post('/giao-vien/lop', createClassAction);
  r.get('/giao-vien/lop/:id', (ctx) => classDetailPage(ctx));
  r.post('/giao-vien/lop/:id/:action', classAction);
  r.get('/giao-vien/hoc-sinh', studentsPage);
  r.post('/giao-vien/hoc-sinh/:id/dat-lai-mat-khau', studentResetAction);
  r.get('/giao-vien/chuong-trinh', (ctx) => curriculumAdminPage(ctx));
  r.post('/giao-vien/chuong-trinh', curriculumAction);
  r.get('/giao-vien/chuong/:id', (ctx) => chapterEditorPage(ctx));
  r.post('/giao-vien/chuong/:id', chapterEditorAction);
  r.get('/giao-vien/dang-toan/:id', (ctx) => topicEditorPage(ctx));
  r.post('/giao-vien/dang-toan/:id', topicEditorAction);
  r.get('/giao-vien/bai-hoc/:id', (ctx) => lessonEditorPage(ctx));
  r.post('/giao-vien/bai-hoc/:id', lessonEditorAction);
  r.post('/giao-vien/anh', uploadImageAction);
  r.get('/giao-vien/cau-hoi', questionBankPage);
  r.get('/giao-vien/cau-hoi/nhap', (ctx) => importPage(ctx));
  r.post('/giao-vien/cau-hoi/nhap', importAction);
  r.get('/giao-vien/cau-hoi/nhap/mau.csv', importTemplate);
  r.get('/giao-vien/cau-hoi/moi', newQuestionPage);
  r.post('/giao-vien/cau-hoi/moi', createQuestionAction);
  r.get('/giao-vien/cau-hoi/:id', editQuestionPage);
  r.post('/giao-vien/cau-hoi/:id', updateQuestionAction);
  r.get('/giao-vien/cau-hoi/:id/xem', previewQuestionPage);
  r.post('/giao-vien/cau-hoi/:id/xoa', deleteQuestionAction);
  r.post('/giao-vien/cau-hoi/:id/nhan-ban', duplicateQuestionAction);
  r.get('/giao-vien/de-kiem-tra', (ctx) => testsPage(ctx));
  r.post('/giao-vien/de-kiem-tra', createTestAction);
  r.get('/giao-vien/de-kiem-tra/:id', (ctx) => testDetailPage(ctx));
  r.post('/giao-vien/de-kiem-tra/:id', testAction);
  r.get('/giao-vien/de-kiem-tra/:id/ket-qua', testResultsPage);
  r.post('/giao-vien/de-kiem-tra/:id/cau-hoi/:qid', testQuestionAction);
  r.post('/giao-vien/de-kiem-tra/:id/:action', testAction);
  r.get('/giao-vien/cham-bai/:id', (ctx) => gradingPage(ctx));
  r.post('/giao-vien/cham-bai/:id', gradingAction);
  r.get('/giao-vien/thong-ke', statsPage);
}
