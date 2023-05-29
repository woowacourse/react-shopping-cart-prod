import { Servers } from '@Types/index';

export const FETCH_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export const FETCH_URL = {
  products: '/products',
  cartItems: '/cart-items',
  orders: '/orders',
};

export const ERROR_MESSAGE = {
  400: '잘못된 요청으로 서버에서 해당 작업을 수행할 수 없습니다. 요청 형식을 다시 확인해주세요.',
  401: '인증 후 다시 시도해주세요.',
  403: '해당 콘텐츠에 접근할 권리가 없습니다. 관리자라면 인증을 시도해주세요.',
  404: '요청받은 페이지를 찾을 수 없습니다. 주소가 정확한지 확인해주세요.',
  500: '처리할 수 없는 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  default: '서버 내부에서 오류가 발생했습니다. 해당 오류가 지속적으로 발생한다면 관리자에게 문의해주세요.',
} as const;

export const SERVERS_NAMES = ['도리와 노아', '베베', '에단'] as const;

export const SERVERS: Record<
  Servers,
  { apiUrl: string; email: string; password: string; avatar: string; serverName: Servers }
> = {
  '도리와 노아': {
    serverName: '도리와 노아',
    apiUrl: '',
    email: '',
    password: '',
    avatar: 'https://ca.slack-edge.com/TFELTJB7V-U04LMNEGB2T-e1f4aef15b2c-512',
  },

  베베: {
    serverName: '베베',
    apiUrl: 'https://dev-king-bebe.n-e.kr',
    email: 'a@a.com',
    password: '1234',
    avatar: 'https://ca.slack-edge.com/TFELTJB7V-U04M28KU1PU-ff7ca3cddc88-512',
  },

  에단: {
    serverName: '에단',
    apiUrl: 'https://dev-king-ethan.n-e.kr',
    email: 'a@a.com',
    password: '1234',
    avatar: 'https://ca.slack-edge.com/TFELTJB7V-U04METH8VKK-f128d33fbf53-512',
  },
};
