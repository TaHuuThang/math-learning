import { Router } from './http/router';
import { sql } from './db';
import { homePage } from './handlers/home';
import { loginPage, loginSubmit, logout, registerPage, registerSubmit, setupPage, setupSubmit } from './handlers/auth';
import { completeLessonAction, coursePage, lessonPage, programPage, reopenLessonAction, teachingPlanPage } from './handlers/curriculum';
import { challengePage, mediaFile, practiceAnswerApi, practiceChapter, practiceHub, practiceLesson } from './handlers/practice';
import { saveDraftApi, startTestAction, studentTestsPage, submitTestApi, takeTestPage, testIntroPage, testResultPage } from './handlers/tests-student';
import { achievementsPage, changePasswordAction, joinClassAction, profilePage } from './handlers/profile';
import { registerTeacherRoutes } from './handlers/teacher/routes';
import { registerAdminRoutes } from './handlers/admin';

export function buildRouter(): Router {
  const r = new Router();
  // Trang học sinh / công khai
  r.get('/', homePage);
  r.get('/chuong-trinh', programPage);
  r.get('/chuong-trinh/:book/ppct', teachingPlanPage);
  r.get('/hoc/:book', coursePage);
  r.get('/hoc/:book/bai/:slug', lessonPage);
  r.post('/hoc/:book/bai/:slug/hoan-thanh', completeLessonAction);
  r.post('/hoc/:book/bai/:slug/hoc-lai', reopenLessonAction);
  r.get('/luyen-tap', practiceHub);
  r.get('/luyen-tap/bai/:slug', practiceLesson);
  r.get('/luyen-tap/chuong/:code', practiceChapter);
  r.get('/thu-thach', challengePage);
  r.post('/api/luyen-tap/tra-loi', practiceAnswerApi);
  r.get('/kiem-tra', studentTestsPage);
  r.get('/kiem-tra/:id', testIntroPage);
  r.post('/kiem-tra/:id/bat-dau', startTestAction);
  r.get('/kiem-tra/lam/:id', takeTestPage);
  r.get('/kiem-tra/ket-qua/:id', testResultPage);
  r.post('/api/kiem-tra/luu/:id', saveDraftApi);
  r.post('/api/kiem-tra/nop/:id', submitTestApi);
  r.get('/thanh-tich', achievementsPage);
  r.get('/ca-nhan', (ctx) => profilePage(ctx));
  r.post('/ca-nhan/vao-lop', joinClassAction);
  r.post('/ca-nhan/mat-khau', changePasswordAction);
  r.get('/media/:id', mediaFile);
  // Tài khoản
  r.get('/dang-nhap', loginPage);
  r.post('/dang-nhap', loginSubmit);
  r.get('/dang-ky', registerPage);
  r.post('/dang-ky', registerSubmit);
  r.post('/dang-xuat', logout);
  r.get('/cai-dat-ban-dau', setupPage);
  r.post('/cai-dat-ban-dau', setupSubmit);
  r.get('/api/suc-khoe', async (ctx) => {
    await ctx.db.one(sql`select 1`);
    return { type: 'json', status: 200, data: { ok: true, time: new Date().toISOString() } };
  });
  registerTeacherRoutes(r);
  registerAdminRoutes(r);
  return r;
}
