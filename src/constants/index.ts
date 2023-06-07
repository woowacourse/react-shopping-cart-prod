import type { ServerNameType } from '../types';

export const LOCAL_STORAGE_KEY = {
  cart: 'cart',
  serverName: 'serverName',
};

export const PRODUCT_MAX_QUANTITY = 1000;

export const MOCK_URL = 'https://backend';

export const PRODUCT_SKELETONS_LENGTH = 8;

export const LOGIN_SINGUP_FORMAT = '[a-zA-Z0-9!@#$%^&*()-_+=?/]{4,10}';
export const LOGIN_SINGUP_ID_PLACEHOLDER = '한글을 제외한 4~10글자 사이의 아이디를 입력해주세요.';
export const LOGIN_SINGUP_PW_PLACEHOLDER = '한글을 제외한 4~10글자 사이의 비밀번호를 입력해주세요.';

export const API_SUCCESS_MESSAGE = {
  postCartItem: '장바구니에 상품을 담았어요.',
  patchCartItemQuantity: '선택한 상품의 수량을 변경했어요.',
  deleteCartItem: '장바구니에서 상품을 제외했어요.',
  signUp: '회원가입을 완료했어요.',
  login: '로그인을 완료했어요.',
  purchase: '주문을 완료했어요.',
};

export const API_ERROR_MESSAGE = {
  server: '일시적인 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  getProducts: '상품 목록을 가져오지 못했어요. 새로고침을 해주세요.',
  getCart: '장바구니 목록을 가져오지 못했어요. 새로고침을 해주세요.',
  postCartItem: '상품을 추가하지 못했어요. 잠시 후 다시 시도해주세요.',
  patchCartItemQuantity: '선택한 상품의 수량을 변경하지 못했어요. 잠시 후 다시 시도해주세요.',
  deleteCartItem: '상품 삭제를 못했어요. 잠시 후 다시 시도해주세요.',
  postSignUp: '회원가입을 실패했어요. 잠시 후 다시 시도해주세요.',
  postLogin: '로그인에 실패했어요. 잠시 후 다시 시도해주세요.',
  getCoupon: '쿠폰을 받아오는데 실패했어요. 잠시 후 다시 시도해주세요.',
  postPurchaseCartItem: '상품을 구입하는데 실패했어요. 잠시 후 다시 시도해주세요.',
  getOrder: '주문 목록을 불러오는데 실패했어요. 잠시 후 다시 시도해주세요.',
  getDetailOrder: '주문상세내역을 불러오는데 실패했어요. 잠시 후 다시 시도해주세요.',
};

export const SERVER_NAMES: ServerNameType[] = ['RAON', 'JOURNY', 'ZUNY'];

export const BASE_URL_MAP: Record<ServerNameType, string> = {
  RAON: 'http://jourzura.kro.kr:8080',
  JOURNY: 'http://journey-shop.kro.kr:8080',
  ZUNY: 'http://jourzura2.kro.kr:8080',
};

export const USER_ID = 'a@a.com';
export const USER_PASSWORD = '1234';
