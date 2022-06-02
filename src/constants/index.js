const API = '/api';

const SERVER_PATH = {
  PRODUCTS: '/products',
  CART: '/cart',
  USER: `${API}/customers`,
  LOGIN: `${API}/login`,
  PASSWORD: `${API}/customers/password`,
  ME: `${API}/customers/me`,
};

const ROUTES_PATH = {
  HOME: '/',
  DETAIL: '/product-detail/:id',
  DETAIL_LINK: '/product-detail/',
  CART: '/shopping-cart',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  USER_INFO: '/user-info',
  MODIFY_PASSWORD: '/modify-password',
  MODIFY_USER_INFO: '/modify-user-info',
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

const USER_INFO_KEY = {
  EMAIL: 'email',
  NICKNAME: 'nickname',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
};

const PASSWORD_INFO_KEY = {
  PREV_PASSWORD: 'prevPassword',
  NEW_PASSWORD: 'newPassword',
  NEW_PASSWORD_CONFIRM: 'newPasswordConfirm',
};

const MESSAGE = {
  ADD: '🧺 장바구니에 추가 되었습니다. 🧺',
  REMOVE: '장바구니에서 제거 되었습니다.',
  CHECK_DELETE: '🗑 정말로 삭제하시겠습니까? 🗑',
  LOGIN_SUCCESS: '로그인 되었습니다.',
  SIGN_UP_SUCCESS: '회원가입 되었습니다.',
  MODIFY_PASSWORD_SUCCESS: '비밀번호가 변경 되었습니다.',
  MODIFY_NICKNAME_SUCCESS: '닉네임이 변경 되었습니다.',
  ERROR_EMAIL: '올바르지 않은 이메일입니다.',
  ERROR_NICKNAME: '올바르지 않은 닉네임입니다.',
  ERROR_PASSWORD: '올바르지 않은 비밀번호입니다.',
  ERROR_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
};

export { SERVER_PATH, ROUTES_PATH, SIZE, USER, USER_INFO_KEY, PASSWORD_INFO_KEY, MESSAGE };
