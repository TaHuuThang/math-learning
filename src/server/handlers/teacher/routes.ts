import type { Router } from '../../http/router';
import { teacherHome } from './overview';
import { classAction, classDetailPage, classesPage, createClassAction, studentResetAction, studentsPage } from './classes';
import { curriculumAdminPage, lessonEditorAction, lessonEditorPage } from './content';
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
  r.get('/giao-vien/chuong-trinh', curriculumAdminPage);
  r.get('/giao-vien/bai-hoc/:id', (ctx) => lessonEditorPage(ctx));
  r.post('/giao-vien/bai-hoc/:id', lessonEditorAction);
  r.get('/giao-vien/cau-hoi', questionBankPage);
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
