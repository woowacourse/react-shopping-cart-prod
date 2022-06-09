import { API_ENDPOINT, API_URL } from 'api/constants';

export const DB_KEYS = {
  USER: 'server-user',
  CART: 'server-shopping-cart',
};

export const ERROR_MESSAGES = {
  EXCEED_QUANTITY: (stock, quantity) =>
    `장바구니에 추가할 수 있는 최대 수량을 초과했습니다. 추가 가능한 최대 수량은 ${Math.max(
      stock - quantity,
      0,
    )}개입니다.`,
  PRODUCT_NOT_FOUND: '존재하지 않는 상품입니다.',
  CART_PRODUCT_NOT_FOUNT: '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.',
};

export const MOCK_SERVER_URL = API_URL[4];

export const END_POINT = (key) => {
  return `${MOCK_SERVER_URL}${API_ENDPOINT[key]}`;
};
