const CART = {
  COUNTER_DISPLAY_TIME: 3000,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
};

const ERROR_MESSAGES = {
  REQUEST: {
    CHECK_USER_NAME_DUPLICATE: '중복 확인에 실패하였습니다. 잠시 후 다시 시도해주세요.',
    SIGNUP: '회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.',
    LOGIN: '로그인에 실패하였습니다. 잠시 후 다시 시도해주세요.',
    GET_USER_NAME: '아이디를 불러오지 못하였습니다. 잠시 후 다시 시도해주세요.',
    UPDATE_USER_INFO: '회원 정보 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
    LEAVE: '회원 탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요.',
    GET_PRODUCTS: '상품을 불러오지 못하였습니다. 잠시 후 다시 시도해주세요.',
    GET_CART: '장바구니를 불러오지 못하였습니다. 잠시 후 다시 시도해주세요.',
    ADD_ITEM_TO_CART: '상품을 장바구니 담지 못하였습니다. 잠시 후 다시 시도해주세요.',
    DELETE_ITEM_FROM_CART: '상품을 장바구니에서 삭제하지 못하였습니다. 잠시 후 다시 시도해주세요.',
    UPDATE_CART_ITEM_QUANTITY: '상품 수량을 변경하지 못하였습니다. 잠시 후 다시 시도해주세요.',
  },
  SIGNUP: {
    USER_NAME_RULE: '아이디는 영문 소문자/숫자/언더바(_)만 사용할 수 있습니다. (5~20자)',
    EXIST_USER_NAME: '이미 가입된 아이디입니다. 다른 아이디를 입력해주세요.',
    NOT_USER_NAME_DUPLICATE_CHECK:
      '아이디 중복이 확인되지 않았습니다. 중복 확인 버튼을 눌러주세요.',
    PASSWORD_RULE:
      '비밀번호는 영문 대문자/소문자/숫자/특수문자(!, @, #, $, %, ^, &, *, -, _)를 각 1자 이상 포함해야 합니다. (8~20자)',
    INCORRECT_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
  },
};

const INFO_MESSAGES = {
  ADDED_TO_CART: '상품이 장바구니에 추가되었습니다. 🥰',
  DELETED_FROM_CART: '상품이 장바구니에서 삭제되었습니다. 🥲',
  ASK_DELETE_SELECTED_PRODUCT: '선택된 상품을 모두 삭제하시겠습니까?',
  ASK_DELETE_PRODUCT: '상품을 삭제하시겠습니까?',
  VALID_USER_NAME: '사용 가능한 아이디입니다.',
  ASK_LEAVE: '정말 탈퇴하시겠습니까? 🥲 회원 정보는 회원 탈퇴 즉시 파기되며 복원이 불가합니다.',
};

export { CART, ERROR_MESSAGES, INFO_MESSAGES };
