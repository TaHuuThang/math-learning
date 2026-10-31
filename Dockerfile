# Ảnh chạy THANG MATH LEARNING (© Tạ Hữu Thắng) – bản dựng sẵn trong dist/ không cần thư viện ngoài khi chạy.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN node scripts/build.mjs

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:3000/api/suc-khoe || exit 1
CMD ["node", "dist/server.mjs", "serve"]
