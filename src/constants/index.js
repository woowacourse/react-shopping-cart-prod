export const USER_ACCESS_POLICY = {
  ONLY_LOGGED_IN: "ONLY_LOGGED_IN",
  ONLY_LOGGED_OUT: "ONLY_LOGGED_OUT",
};

export const API_SERVER = {
  // eslint-disable-next-line no-undef
  BASE_URL: API_URL,
  PATH: {
    PRODUCTS: "/products",
    MY_CARTS: "/mycarts",
    MY_ORDERS: "/myorders",
  },
};

export const REQUEST_METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

export const FETCH_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};
