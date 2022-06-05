const PATH_NAME = {
  HOME: '/',
  PRODUCT: '/product',
  CART: '/cart',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  MODIFY_PROFILE: '/modify-profile',
};

const MESSAGE = {
  MINIMUM_CART_LENGTH: '최소 주문 갯수는 1개 입니다.',
};

const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

const INITIAL_SKELETON_NUMBER = 8;

const EMAIL_REGEX =
  /^[0-9a-z]([-_]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,3}$/;

const NAME_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}$/;

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!?-])[A-Za-z\d@!?-]{6,}$/;

export {
  PATH_NAME,
  MESSAGE,
  METHOD,
  INITIAL_SKELETON_NUMBER,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
};
