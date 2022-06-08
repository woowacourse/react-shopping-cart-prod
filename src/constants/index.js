export const BASE_SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://ec2-13-125-205-115.ap-northeast-2.compute.amazonaws.com:8080"
    : "dev";

export const SERVER_PATH = {
  PRODUCT_LIST: "/products",
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
