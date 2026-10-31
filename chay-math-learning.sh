#!/bin/sh
# Khởi động THANG MATH LEARNING trên macOS/Linux
cd "$(dirname "$0")"
[ -f .env ] || { cp .env.example .env; echo "Đã tạo .env – sửa DATABASE_URL rồi chạy lại."; exit 1; }
exec node dist/server.mjs serve
