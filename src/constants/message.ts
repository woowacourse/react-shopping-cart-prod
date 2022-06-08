const CART_MESSAGE = {
  FAIL_LOAD: '장바구니 정보를 가져오는 데 에러가 발생하였습니다.',
  SUCCESS_ADD: '장바구니에 추가되었습니다.',
  FAIL_ADD: '장바구니에 넣는 데 실패하였습니다. 다시 시도해주세요.',
  FAIL_DELETE: '장바구니에서 삭제하는 데 실패하였습니다. 다시 시도해주세요.',
  FAIL_CHANGE_QUANTITY:
    '장바구니 수량을 조절하는 데 실패하였습니다. 다시 시도해주세요.',
  ASK_DELETE: '삭제하시겠습니까?',
  NEED_CHECKED_ITEM: '먼저 상품을 선택해주세요.',
};

const USER_MESSAGE = {
  WRONG_PHONE_NUMBER: '핸드폰 번호는 010으로 시작해야 하며 총 11자여야 합니다.',
  FAIL_LOGIN: '아이디 혹은 비밀번호를 확인해주세요.',
  FAIL_SIGNUP: '기입하신 정보를 확인해주세요.',
  FAIL_EDIT: '주소 혹은 핸드폰 번호를 확인해주세요.',
  FAIL_WITH_DRAW: '회원 탈퇴에 실패하였습니다. 다시 시도해주세요.',
  ASK_WITH_DRAW: '탈퇴하시겠습니까?',
  ASK_LOGOUT: '로그아웃하시겠습니까?',
  NEED_LOGIN: '로그인이 필요한 기능입니다.',
  ALREADY_LOGGED_IN: '이미 로그인 되어 있으므로 메인 페이지로 이동합니다.',
};

export { CART_MESSAGE, USER_MESSAGE };
