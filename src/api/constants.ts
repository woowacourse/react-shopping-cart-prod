// eslint-disable-next-line no-undef
export const API_URL = process.env.REACT_APP_API_URL;

export const CUSTOMERS_API_URL = {
  TO_CUSTOMERS: `${API_URL}/customers`,
  TO_PASSWORD: `${API_URL}/customers/password`,
  TO_LOGIN: `${API_URL}/customers/login`,
  TO_SIGNUP: `${API_URL}/customers/signup`,
};

export const CART_API_URL = {
  TO_CARTS: `${API_URL}/carts`,
  TO_PRODUCT_ID: `${API_URL}/carts/:productId`,
};

export const PRODUCT_API_URL = {
  TO_PRODUCTS: `${API_URL}/products`,
  TO_PRODUCT_ID: `${API_URL}/products/:productId`,
};

export const PRODUCT_LIST_PAGE_LIMIT = 12;
