export const BASE_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-shoppingcart-server.herokuapp.com"
    : "dev";

export const SERVER_PATH = {
  PRODUCT_LIST: "/products",
  CART_LIST: "/carts",
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
  NICKNAME_MAX_LENGTH: 10,
  NICKNAME_MIN_LENGTH: 1,
  PW_MAX_LENGTH: 20,
  PW_MIN_LENGTH: 8,
};
