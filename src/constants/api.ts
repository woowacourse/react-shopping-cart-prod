const BASE64 = btoa(process.env.REACT_APP_API_USERNAME + ':' + process.env.REACT_APP_API_PASSWORD);

const MEMBER = ['아코', '주디', '저문', '프론트'] as const;

const FRONT_API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_FRONT_BASE_URL
    : process.env.REACT_APP_LOCAL_BASE_URL;

const API_BASE_URL_LIST = {
  [MEMBER[0]]: process.env.REACT_APP_AK_API_BASE_URL,
  [MEMBER[1]]: process.env.REACT_APP_JD_API_BASE_URL,
  [MEMBER[2]]: process.env.REACT_APP_JM_API_BASE_URL,
  [MEMBER[3]]: FRONT_API_BASE_URL,
} as const;

const DEFAULT_API_BASE_URL = API_BASE_URL_LIST[MEMBER[0]];

const API_ENDPOINT = {
  PRODUCTS: '/products',
  CART_ITEMS: '/cart-items',
  ORDERS: '/orders',
  MEMBERS: '/members',
} as const;

const FETCH_DEFAULT_OPTION = {
  headers: {
    Accept: 'application/json',
  },
} as const;

const AUTHORIZED_FETCH_OPTION_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${BASE64}`,
} as const;

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const HTTP_ERROR_MESSAGE = {
  [HTTP_STATUS_CODE.NOT_FOUND]: {
    HEADING: '페이지를 찾을 수 없습니다.',
    BODY: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.',
    BUTTON: '홈으로 가기',
  },
  [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
    HEADING: '현재 페이지를 표시할 수 없습니다.',
    BODY: `잠시 후 다시 시도해주세요.`,
    BUTTON: '새로고침',
  },
  [HTTP_STATUS_CODE.BAD_REQUEST]: {
    HEADING: '잘못된 요청입니다.',
    BODY: '확인 후 다시 시도해주세요.',
    BUTTON: '홈으로 가기',
  },
} as const;

const CART_API_ERROR_MESSAGE = {
  ADD: {
    [HTTP_STATUS_CODE.BAD_REQUEST]: '해당하는 상품이 없습니다.',
    [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]:
      '일시적인 오류로 상품을 장바구니 추가하는 데 실패했습니다. 새로고침 후 시도해 주세요.',
  },
  UPDATE: {
    [HTTP_STATUS_CODE.BAD_REQUEST]: '해당하는 상품이 없습니다.',
    [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]:
      '일시적인 오류로 수량 변경을 할 수 없습니다. 새로고침 후 시도해 주세요.',
  },
  DELETE: {
    [HTTP_STATUS_CODE.BAD_REQUEST]: '해당하는 상품이 없습니다.',
    [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]:
      '일시적인 오류로 삭제를 할 수 없습니다. 새로고침 후 시도해 주세요.',
  },
} as const;

export {
  BASE64,
  API_BASE_URL_LIST,
  DEFAULT_API_BASE_URL,
  API_ENDPOINT,
  FETCH_DEFAULT_OPTION,
  AUTHORIZED_FETCH_OPTION_HEADERS,
  HTTP_STATUS_CODE,
  HTTP_ERROR_MESSAGE,
  CART_API_ERROR_MESSAGE,
};
