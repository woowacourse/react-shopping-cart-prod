const SERVER_PATH = Object.freeze({
  PRODUCTS: `${process.env.REACT_APP_API_ZERO}/products`,
  CART: `${process.env.REACT_APP_API_ZERO}/carts`,
  CART_PRODUCT: `${process.env.REACT_APP_API_ZERO}/carts/products`,
  USER: `${process.env.REACT_APP_API_ZERO}/customers`,
  LOGIN: `${process.env.REACT_APP_API_ZERO}/login`,
  PASSWORD: `${process.env.REACT_APP_API_ZERO}/customers/password`,
  ME: `${process.env.REACT_APP_API_ZERO}/customers/me`,
});

const ROUTES_PATH = Object.freeze({
  HOME: '/',
  DETAIL: '/product-detail/:id',
  DETAIL_LINK: '/product-detail/',
  CART: '/shopping-cart',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  USER_INFO: '/user-info',
  MODIFY_PASSWORD: '/modify-password',
  MODIFY_USER_INFO: '/modify-user-info',
});

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
  LOGOUT_SUCCESS: '로그아웃 되었습니다.',
  WITHDRAW_SUCCESS: '회원탈퇴 되었습니다.',
  NOT_AN_EMAIL_FORMAT: '올바른 이메일을 입력해 주세요.',
  INCORRECT_NICKNAME: '올바른 닉네임을 입력해 주세요.',
  PASSWORD_DOES_NOT_MATCH: '비밀번호가 일치하지 않습니다. 똑같은 비밀번호를 입력해 주세요.',
  NOT_A_PASSWORD_FORMAT:
    '비밀번호는 8~20글자 이하 영문자(대,소), 숫자, 특수기호 조합을 입력해 주세요',
  PASSWORD_PLACEHOLDER: '영문자(대,소), 숫자, 특수기호 조합을 입력하세요',
  EMAIL_PLACEHOLDER: '이메일 주소를 입력해주세요',
  NICKNAME_PLACEHOLDER: '닉네임을 입력해주세요',
};

export { SERVER_PATH, ROUTES_PATH, SIZE, USER, USER_INFO_KEY, PASSWORD_INFO_KEY, MESSAGE };
