const PRODUCT = {
  MIN_QUANTITY: 1,
};

const MODAL = {
  CLOSE_TIME: 1500,
};

const ROUTES = {
  HOME: '/',
  CART: 'cart',
  ORDER: 'order',
  DETAILS: 'details/:id',
};

const LINK = {
  TO_HOME: '/',
  TO_CART: '/cart',
  TO_DETAILS: '/details',
};

const MESSAGE = {
  LOGIN_SUCCESS: '님 환영합니다 👋. 로그인에 성공하였습니다.',
  LOGIN_FAILURE: '로그인에 실패하였습니다. 아이디와 비밀번호를 다시 확인해주세요.',
  ALREADY_LOGIN: '이미 로그인되어있습니다.',
  NO_AUTHORIZATION: '접근권한이 없습니다. 로그인을 해주세요.',
  LOGOUT_SUCCESS: '로그아웃에 성공하였습니다.',
  LOGOUT_FAILURE: '로그아웃에 실패하였습니다.',
  UPDATE_NICKNAME_SUCCESS: '닉네임 변경에 성공하였습니다.',
  UPDATE_NICKNAME_FAILURE: '닉네임 변경에 실패하였습니다.',
  UPDATE_PASSWORD_SUCCESS: '비밀번호 변경에 성공하였습니다.',
  UPDATE_PASSWORD_FAILURE: '비밀번호 변경에 실패하였습니다.',
  DELETE_ACCOUNT_SUCCESS: '계정 삭제에 성공하였습니다.',
  DELETE_ACCOUNT_FAILURE: '계정 삭제에 실패하였습니다.',
  ADD_CART_SUCCESS: '상품을 장바구니에 추가하였습니다.',
  REMOVE_CART_SUCCESS: '상품을 장바구니에서 제거하였습니다.',
  SIGNUP_SUCCESS: '님 가입해주셔서 감사합니다 👋 로그인해주세요',
  SIGNUP_FAILURE: '회원가입에 실패하였습니다. 다시 시도해주세요.',
  INVALID_EMAIL_FORMAT: '올바른 이메일 형식을 입력해주세요.',
  INVALID_EMAIL_BLANK: '공백없이 이메일을 적어주세요.',
  INVALID_PASSWORD_FORMAT: '비밀번호는 10자리 이상이며 영문, 숫자, 특수문자가 조합되어야 합니다.',
  INVALID_NICKNAME_FORMAT: '닉네임은 2자리 이상 10자리 이하여야 합니다.',
};

const ERROR = {
  1001: '존재하지 않은 URL입니다',
  1002: '토큰의 유효 기간이 만료되었습니다',
  1003: '토큰이 유효하지 않습니다',
  1004: '인증이 필요한 접근입니다',
  2001: '이미 존재하는 이메일입니다',
  2101: '이메일 형식이 맞지 않습니다',
  2102: '닉네임 형식이 맞지 않습니다',
  2103: '비밀번호 형식이 맞지 않습니다',
  2201: '이메일 혹은 비밀번호가 일치하지 않습니다',
  2202: '입력된 비밀번호가 현재 비밀번호와 일치하지 않습니다',
  3001: '상품 목록에서 요청하신 상품이 존재하지 않습니다',
  4001: '해당 상품이 장바구니에 존재하지 않습니다',
  4101: '수량 형식이 맞지 않습니다',
  5001: '존재하지 않는 주문입니다',
};

const ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export { PRODUCT, MODAL, ROUTES, LINK, ENV, MESSAGE, ERROR };
