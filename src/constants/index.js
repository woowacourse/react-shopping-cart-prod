const URL = {
  릭: "http://ec2-3-39-194-30.ap-northeast-2.compute.amazonaws.com:8080",
  봄: "http://ec2-54-180-119-11.ap-northeast-2.compute.amazonaws.com:8080",
  베루스: "http://ec2-52-79-228-178.ap-northeast-2.compute.amazonaws.com:8080",
  토닉: "http://ec2-3-39-11-100.ap-northeast-2.compute.amazonaws.com:8080",
  쿤: "http://ec2-15-164-96-161.ap-northeast-2.compute.amazonaws.com:8080",
};

const BASE_URL = URL.베루스;

const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EDIT: "/edit",
  DETAIL: "/detail",
  CART: "/cart",
  NOT_FOUND: "/not-found",
};

const STATUS = {
  READY: "ready",
  FULFILLED: "fulfilled",
};

const ERROR_STATUS = {
  EMAIL_RULE: "EMAIL_RULE",
  NICKNAME_RULE: "NICKNAME_RULE",
  PASSWORD_RULE: "PASSWORD_RULE",
  MISMATCH: "MISMATCH",
};

const ERROR_MESSAGE = {
  EMAIL_RULE: "이메일 주소를 입력해주세요",
  NICKNAME_RULE: "2~8자 사이의 닉네임을 입력해주세요",
  PASSWORD_RULE: "영문, 숫자를 포함하여 8-20자로 입력하세요",
  MISMATCH: "비밀번호가 일치하지 않습니다",
};

const ERROR_CODE = {
  1000: "INVALID_SIGNUP_INPUT",
  1001: "EXIST_EMAIL",
  1002: "CHECK_EMAIL_OR_PASSWORD",
  1100: "INVALID_CART",
  1101: "EXIST_PRODUCT_IN_CART",
  1102: "CANNOT_REMOVE",
};

const MESSAGE = {
  CART_ADDED: "장바구니에 상품이 담겼습니다",
  NOT_AUTHORIZED: "접근할 수 없는 페이지입니다",
  CHECK_EMAIL_OR_PASSWORD: "이메일 주소 혹은 비밀번호를 확인해주세요.",
  INVALID_SIGNUP_INPUT: "회원 정보 양식이 잘못되었습니다.",
  EXIST_EMAIL: "이미 존재하는 이메일입니다.",
  WITHDRAWAL_CONFIRM: "정말로 탈퇴하시겠습니까? 😭",
  EXIST_PRODUCT_IN_CART: "장바구니에 이미 존재하는 물품입니다.",
  LOGIN_SUCCESS: "로그인 성공",
};

const INPUT_TYPE = {
  EMAIL: "EMAIL",
  NICKNAME: "NICKNAME",
  PASSWORD: "PASSWORD",
};

const NICKNAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 8,
};

const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
};

const AMOUNTBOX_TYPE = {
  CART: "cart",
  PAY: "pay",
};

export {
  AMOUNTBOX_TYPE,
  BASE_URL,
  ERROR_CODE,
  ERROR_MESSAGE,
  ERROR_STATUS,
  INPUT_TYPE,
  MESSAGE,
  NICKNAME,
  PASSWORD,
  PATH,
  STATUS,
};
