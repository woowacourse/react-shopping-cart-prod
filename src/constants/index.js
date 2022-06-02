const BASE_URL = "https://woo-shopping-cart-api.herokuapp.com";
const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EDIT: "/edit",
  DETAIL: "/detail",
  CART: "/cart",
  NOT_FOUND: "*",
};

const STATUS = {
  READY: "ready",
  FULFILLED: "fulfilled",
};

const ERROR_STATUS = {
  WRONG_LENGTH: "WRONG_LENGTH",
  PASSWORD_RULE: "PASSWORD_RULE",
  EMAIL_RULE: "EMAIL_RULE",
  MISMATHCH: "MISMATHCH",
};

const ERROR_MESSAGE = {
  EMAIL_RULE: "이메일 주소를 입력해주세요",
  WRONG_LENGTH: "올바르지 않은 길이입니다",
  PASSWORD_RULE: "영문, 숫자를 포함하여 8-20자로 입력하세요",
  MISMATHCH: "비밀번호가 일치하지 않습니다",
};

const MESSAGE = {
  CART_ADDED: "장바구니에 상품이 담겼습니다",
  NOT_AUTHORIZED: "접근할 수 없는 페이지입니다",
  CHECK_EMAIL_OR_PASSWORD: "이메일 주소 혹은 비밀번호를 확인해주세요.",
  INVALID_SIGNUP_INPUT: "회원 정보 양식이 잘못되었습니다.",
  EXIST_EMAIL: "이미 존재하는 이메일입니다.",
  WITHDRAWAL_CONFIRM: "정말로 탈퇴하시겠습니까? 😭",
};

const NICKNAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 8,
};

const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
};

export {
  BASE_URL,
  PATH,
  STATUS,
  ERROR_STATUS,
  ERROR_MESSAGE,
  MESSAGE,
  NICKNAME,
  PASSWORD,
};
