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
import { blueprintAction, blueprintPage, generatorAction, generatorPage } from './exam-generator';
import { exportQuestions } from './import';
import { approveQuestionAction, bulkApproveAction, questionImageAction } from './questions';
import { practiceGradingAction, practiceGradingPage } from './practice-grading';

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
  r.get('/giao-vien/cau-hoi/nhap/mau.xlsx', importTemplate);
  r.get('/giao-vien/cau-hoi/xuat', exportQuestions);
  r.post('/giao-vien/cau-hoi/duyet', bulkApproveAction);
  r.get('/giao-vien/cau-hoi/moi', newQuestionPage);
  r.post('/giao-vien/cau-hoi/moi', createQuestionAction);
  r.get('/giao-vien/cau-hoi/:id', editQuestionPage);
  r.post('/giao-vien/cau-hoi/:id', updateQuestionAction);
  r.get('/giao-vien/cau-hoi/:id/xem', previewQuestionPage);
  r.post('/giao-vien/cau-hoi/:id/xoa', deleteQuestionAction);
  r.post('/giao-vien/cau-hoi/:id/nhan-ban', duplicateQuestionAction);
  r.post('/giao-vien/cau-hoi/:id/duyet', approveQuestionAction);
  r.post('/giao-vien/cau-hoi/:id/anh', questionImageAction);
  r.post('/giao-vien/cau-hoi/:id/anh/:imageId/xoa', questionImageAction);
  r.get('/giao-vien/de-kiem-tra', (ctx) => testsPage(ctx));
  r.get('/giao-vien/de-kiem-tra/tu-dong', (ctx) => generatorPage(ctx));
  r.post('/giao-vien/de-kiem-tra/tu-dong', generatorAction);
  r.get('/giao-vien/de-kiem-tra/cau-hinh/:id', (ctx) => blueprintPage(ctx));
  r.post('/giao-vien/de-kiem-tra/cau-hinh/:id/:action', blueprintAction);
  r.post('/giao-vien/de-kiem-tra', createTestAction);
  r.get('/giao-vien/de-kiem-tra/:id', (ctx) => testDetailPage(ctx));
  r.post('/giao-vien/de-kiem-tra/:id', testAction);
  r.get('/giao-vien/de-kiem-tra/:id/ket-qua', testResultsPage);
  r.post('/giao-vien/de-kiem-tra/:id/cau-hoi/:qid', testQuestionAction);
  r.post('/giao-vien/de-kiem-tra/:id/:action', testAction);
  r.get('/giao-vien/cham-bai/:id', (ctx) => gradingPage(ctx));
  r.post('/giao-vien/cham-bai/:id', gradingAction);
  r.get('/giao-vien/thong-ke', statsPage);
  r.get('/giao-vien/cham-luyen-tap', (ctx) => practiceGradingPage(ctx));
  r.post('/giao-vien/cham-luyen-tap/:id', practiceGradingAction);
}
