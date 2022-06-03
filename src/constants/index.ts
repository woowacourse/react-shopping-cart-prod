const MAX_RESULT_ITEM_LIST = 12;

const ALERT_MESSAGE = {
  WRONG_ACCESS: '잘못된 접근입니다.',
  LOGIN_SUCCESS: (name: string) => `${name}님 로그인 되었습니다.`,
  SIGNUP_SUCCESS: (name: string) => `${name}님 회원가입 축하드립니다.`,
};

export { MAX_RESULT_ITEM_LIST, ALERT_MESSAGE };
