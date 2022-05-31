const API = '/api';

const SERVER_PATH = {
  PRODUCTS: '/products',
  CART: '/cart',
  SIGN_UP: `${API}/customers`,
  LOGIN: `${API}/customers`,
};

const ROUTES_PATH = {
  HOME: '/',
  DETAIL: '/product-detail/:id',
  DETAIL_LINK: '/product-detail/',
  CART: '/shopping-cart',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
};

const SIZE = {
  LARGE: 'large',
  MIDDLE: 'middle',
};

const USER = {
  NICKNAME: {
    MIN: 1,
    MAX: 10,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 20,
  },
};

const MESSAGE = {
  ADD: '🧺 장바구니에 추가 되었습니다. 🧺',
  REMOVE: '장바구니에서 제거 되었습니다.',
  CHECK_DELETE: '🗑 정말로 삭제하시겠습니까? 🗑',
  ERROR_EMAIL: '올바르지 않은 이메일입니다.',
  ERROR_NICKNAME: '올바르지 않은 닉네임입니다.',
  ERROR_PASSWORD: '올바르지 않은 비밀번호입니다.',
  ERROR_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
};

export { SERVER_PATH, ROUTES_PATH, SIZE, USER, MESSAGE };
