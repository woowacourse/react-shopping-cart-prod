const MESSAGES = {
  ADDED_TO_CART: '장바구니에 추가되었습니다. 😍',
  DELETED_FROM_CART: '장바구니에서 삭제되었습니다. 🥲',
  ASK_DELETE_SELECTED_PRODUCT: '선택된 상품을 삭제 하시겠습니까?',
  ASK_DELETE_PRODUCT: '해당 상품을 삭제하시겠습니까?',
  ASK_LEAVE: '정말 탈퇴하시겠습니까? 🥲',
  COMPLETE_CHANGE_PASSWORD: '✅ 비밀번호가 변경되었습니다.',
  COMPLETE_SIGNUP: '✅ 회원가입이 완료되었습니다.',
  COMPLETE_LOGIN: '✅ 로그인 되었습니다.',
  COMPLETE_LOGOUT: '✅ 로그아웃 되었습니다.',
  COMPLETE_LEAVE: '✅ 회원탈퇴 되었습니다.',
  MISMATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  CHECK_DUPLICATE_ID_ERROR: '중복 체크 중 에러가 발생했습니다. 나중에 다시 시도하세요.',
  EXIST_ID: '이미 가입된 아이디입니다. 다른 아이디를 입력하여 주세요.',
  AVAILABLE_ID: '사용 가능한 아이디입니다.',
};

const PRODUCT = {
  MIN_COUNT: 1,
};

const CART = {
  MIN_COUNT: 1,
  MAX_COUNT: 99,
  COUNTER_DISPLAY_TIME: 3000,
};

const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 16,
};

const ID = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 20,
};

export { MESSAGES, PRODUCT, CART, PASSWORD, ID };
