export const MAX_QUANTITY = 99;
export const MIN_QUANTITY = 0;
export const MAX_LENGTH_QUANTITY = 2;

export const KEY_LOCALSTORAGE_SERVER_OWNER = "owner";
export const DEFAULT_VALUE_SERVER_OWNER = "애쉬";

export const DELIVERY_FEE = 3000;

export const SERVERS: Record<string, string> = {
  리오: "https://woowa-reo.store",
  애쉬: "https://woowa-ash.store",
  루카: "https://woowa-luca.store",
} as const;

export const ERROR_MESSAGE = {
  "400": "Bad Request: 잘못된 요청입니다.",
  "401": "Unauthorized: 인증에 실패했습니다",
  "403": "Forbidden: 해당 페이지에 접근할 수 없습니다.",
  "404": "Not Found: 해당 경로를 찾을 수 없습니다.",
  "409": "Confilct: 요청에 대해 충돌이 있습니다.",
  "405": "Method Not Allowed: 관리자에게 문의해주세요.",
  "500": "Internal Server Error: 서버에서 요청처리 중 에러가 발생했습니다.",
  "501": "Service Unavailable: 서버가 일시적으로 요청을 처리할 수 없습니다.",
} as const;
