export const MAX_QUANTITY = 99;
export const MIN_QUANTITY = 0;
export const MAX_LENGTH_QUANTITY = 2;

export const KEY_LOCALSTORAGE_SERVER_OWNER = 'owner';
export const DEFAULT_VALUE_SERVER_OWNER = '애쉬';

export const DELIVERY_FEE = 3000;

export const SERVERS: Record<string, string> = {
  리오: 'https://woowa-reo.store',
  애쉬: 'https://woowa-ash.store',
  루카: 'https://woowa-luca.store',
} as const;

export const STATUS_ERROR_MESSAGE = {
  '400': '해당 정보가 없습니다.',
  '401': '인증에 실패했습니다',
  '403': '권한이 없습니다!',
  '404': '해당 경로를 찾을 수 없습니다.',
  '500': '요청처리 중 예기치 못한 에러가 발생했습니다.',
  default: '죄송합니다. 오류가 발생했어요! 잠시만 기다려주세요',
} as const;
