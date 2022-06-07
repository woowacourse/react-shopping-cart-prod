export const ALERT_MESSAGES = {
  PRODUCT_ADDED: (count) => `${count}개가 장바구니에 추가되었습니다.`,
  REGISTER_SUCCESS: '회원 가입에 성공했습니다.',
  USER_INFO_UPDATE_SUCCESS: '회원 정보 수정에 성공했습니다.',
  USER_PASSWORD_UPDATE_SUCCESS: '회원 비밀번호 수정에 성공했습니다.',
  LOGOUT_CONFIRM: '로그아웃 하시겠습니까?',
};

export const WARNING_MESSAGES = {
  PRODUCTS_DELETE: (count) => `${count}개의 상품을 삭제하시겠습니까?`,
  MIN_QUANTITY: '구입할 수 있는 최소 수량입니다.',
  MAX_QUANTITY: '구입할 수 있는 최대 수량입니다.',
  LOGIN_REQUIRED: '로그인 후에 장바구니에 추가할 수 있습니다.',
  ORIGINAL_AMOUNT_DISCARD: (quantity, availableProductQuantity) =>
    `기존에 장바구니에 추가된 수량은 ${quantity}개 입니다. 수량을 ${
      availableProductQuantity - 1
    }개로 조정하시겠습니까?`,
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: '서버에서 오류가 발생했습니다! 잠시 후 다시 시도해주세요!',
  INVALID_REQUEST: '잘못된 요청입니다. 확인 후 다시 시도해주세요.',
  UNKNOWN:
    '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의해주세요',

  INVALID_PAGE: '😱 존재하지 상품 페이지입니다. 😱',

  OUT_OF_STOCK: '품절된 상품입니다.',

  INCORRECT_PASSWORD: '비밀번호가 올바르지 않습니다.',
  INVALID_EMAIL: '올바르지 않은 이메일 형식입니다.',
  NO_DUPLICATE_CHECK: '이메일 중복 확인을 진행해주세요.',
  DUPLICATE_EMAIL: '사용할 수 없는 이메일입니다.',
  INVALID_FORM: '올바르지 않은 입력 값이 있습니다. 다시 한번 확인해주세요.',
  LOGIN_FAIL: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
  USER_INFO_UPDATE_FAIL: '회원정보 수정에 실패했습니다.',
  USER_DELETE_FAIL: '회원정보 삭제에 실패했습니다.',

  USER_INFO_RULE_ERROR: {
    INVALID_EMAIL: '올바르지 않은 이메일 형식입니다.',
    DUPLICATE_EMAIL: '사용할 수 없는 이메일입니다.',
    INVALID_PASSWORD:
      '비밀번호는 숫자, 영문자, 특수문자($@$!%*#?&)의 조합으로 8 ~ 20자 입력해주세요.',
    PASSWORD_NO_MATCH: '비밀번호가 일치하지 않습니다.',
    INVALID_NICKNAME: '닉네임은 1 ~ 5자의 한글로 입력해주세요.',
  },
};
