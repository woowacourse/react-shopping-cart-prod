import type { ServerNameType } from './types';

export const LOCAL_STORAGE_KEY = {
  token: 'token',
  serverName: 'serverName',
};

export const MAX_QUANTITY = 100;

export const MOCK_URL = 'https://backend';

export const SKELETONS_LENGTH = 8;

export const REDIRECT_MESSAGE = '로그인이 필요한 페이지 입니다.';

export const API_INFO_MESSAGE = {
  postJoin: '🎉 가입을 축하드립니다! 쿠폰을 확인해주세요. 🎉',
  postCartItem: '장바구니에 상품을 담았어요! 😆',
  patchCartItemQuantity: '수량을 변경했어요 🙂',
  deleteCartItem: '장바구니에서 상품을 뺐어요!',
};

export const API_ERROR_MESSAGE = {
  getProducts: '상품 목록을 가져오지 못했어요! 페이지를 새로고침 해주세요 🙇',
  getCart: '장바구니 목록을 가져오지 못했어요! 페이지를 새로고침 해주세요 🙇',
  getCoupons: '쿠폰 목록을 가져오지 못했어요! 페이지를 새로고침 해주세요 🙇',
  postCartItem: '상품이 추가되지 않았어요! 다시 시도해주세요 🙇',
  patchCartItemQuantity: '수량이 변경되지 않았어요! 다시 시도해주세요 🙇',
  postOrder: '주문이 되지 않았어요! 다시 시도해주세요 🙇',
  deleteCartItem: '아이템 삭제가 안됐어요! 다시 시도해 주세요 🙇',
};

export const SERVER_NAMES: readonly ServerNameType[] = ['MSW', '라온', '져니', '쥬니'];

export const BASE_URL_MAP: Record<ServerNameType, string> = {
  MSW: MOCK_URL,
  라온: 'https://jourzura.kro.kr',
  져니: 'http://journey-shop.kro.kr:8080',
  쥬니: 'https://jourzura2.kro.kr',
};

export const USER_ID = 'a@a.com';
export const USER_PASSWORD = '1234';
