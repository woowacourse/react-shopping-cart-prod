// export const BASE_SERVER_URL =
//   process.env.NODE_ENV === "production"
//     ? "http://ec2-13-125-205-115.ap-northeast-2.compute.amazonaws.com:8080"
//     : "dev";

/* 열음 서버 */
export const BASE_SERVER_URL = "http://54.180.100.165:8080";

/* 로마 서버 */
// export const BASE_SERVER_URL =
//   "http://ec2-13-125-205-115.ap-northeast-2.compute.amazonaws.com:8080";

/* 소주캉 서버 */
// export const BASE_SERVER_URL = "http://13.209.50.192:8080";

/* 알렉스 서버 */
// export const BASE_SERVER_URL = "http://15.164.212.121:8080";

/* 필즈 서버 */
// export const BASE_SERVER_URL = "http://15.165.204.174:8080";

export const SERVER_PATH = {
  PRODUCT_LIST: "/api/products",
  CART_LIST: "/carts",
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

export const COOKIE_KEY = {
  TOKEN: "token",
  USER_ID: "userid",
};
