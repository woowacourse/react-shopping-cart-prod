export const BASE_SERVER_URL = (index = 0) => {
  const serverUrls = [
    "dev", // msw
    process.env.REACT_APP_SERVER1,
    process.env.REACT_APP_SERVER2,
    process.env.REACT_APP_SERVER3,
    process.env.REACT_APP_SERVER4,
    process.env.REACT_APP_SERVER5,
  ];
  return serverUrls[index];
};

export const SERVER_PATH = {
  PRODUCT_LIST: "/api/products",
  CUSTOMER_LIST: "/api/customers",
  LOGIN: "/api/auth/login",
};

export const ROUTES = {
  ROOT: "/",
  PRODUCT_LIST: "/product-list",
  PRODUCT_DETAIL: "/product-detail",
  PRODUCT_CART: "/product-cart",
  PRODUCT_ORDER_LIST: "/product-order-list",
  LOGIN: "/login",
  REGISTER: "/register",
  USER_INFO: "/user-info",
};

export const RANGE = {
  EMAIL_MAX_LENGTH: 50,
  EMAIL_MIN_LENGTH: 8,
  USERNAME_MAX_LENGTH: 10,
  USERNAME_MIN_LENGTH: 1,
  PW_MAX_LENGTH: 20,
  PW_MIN_LENGTH: 8,
};

export const JWT_COOKIE_KEY = "token";
export const USER_ID_KEY = "userId";
export const SERVER_INDEX_KEY = "server-index";
