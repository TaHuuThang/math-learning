@echo off
chcp 65001 >nul
title THANG MATH LEARNING - Ta Huu Thang
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Chua cai Node.js. Tai ban LTS tai https://nodejs.org roi chay lai tep nay.
  pause
  exit /b 1
)
if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Da tao tep .env. Hay mo .env bang Notepad, sua dong DATABASE_URL cho dung PostgreSQL cua may, roi chay lai.
  notepad ".env"
  pause
  exit /b 1
)
echo Dang khoi dong THANG MATH LEARNING... Mo trinh duyet tai http://localhost:3000
node dist\server.mjs serve
pause
