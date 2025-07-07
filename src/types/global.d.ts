export {};

declare global {
  interface Window {
    naver: typeof import("naver-maps");
  }
}
