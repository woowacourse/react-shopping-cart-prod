const BASE_URL =
  "http://ec2-3-39-194-30.ap-northeast-2.compute.amazonaws.com:8080";

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
  MISMATCH: "MISMATCH",
};

const ERROR_MESSAGE = {
  EMAIL_RULE: "이메일 주소를 입력해주세요",
  WRONG_LENGTH: "올바르지 않은 길이입니다",
  PASSWORD_RULE: "영문, 숫자를 포함하여 8-20자로 입력하세요",
  MISMATCH: "비밀번호가 일치하지 않습니다",
};

const MESSAGE = {
  CART_ADDED: "장바구니에 상품이 담겼습니다",
  NOT_AUTHORIZED: "접근할 수 없는 페이지입니다",
  CHECK_EMAIL_OR_PASSWORD: "이메일 주소 혹은 비밀번호를 확인해주세요.",
  INVALID_SIGNUP_INPUT: "회원 정보 양식이 잘못되었습니다.",
  EXIST_EMAIL: "이미 존재하는 이메일입니다.",
  WITHDRAWAL_CONFIRM: "정말로 탈퇴하시겠습니까? 😭",
  EXIST_ITEM_IN_CART: "장바구니에 이미 추가된 상품입니다.",
  INVALID_ACCESS: "잘못된 접근입니다.",
  LOGIN_REQUEST_FOR_ADD_CART: "장바구니에 상품을 추가하려면 로그인해주세요.",
};

const NICKNAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 8,
};

const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
};

const REGULAR_EXPRESSION = {
  EMAIL:
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  NICKNAME: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
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
  REGULAR_EXPRESSION,
};
