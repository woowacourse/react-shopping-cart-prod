export const BASE_SERVER_URL = (index = 0) => {
  const serverUrls = [
    "dev", // msw
    "http://ec2-13-125-205-115.ap-northeast-2.compute.amazonaws.com:8080",
    "server2",
    "server3",
    "server4",
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
