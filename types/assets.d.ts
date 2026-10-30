// Tệp .sql được esbuild nhúng vào bản dựng dưới dạng chuỗi văn bản.
declare module '*.sql' {
  const content: string;
  export default content;
}
