export const API_URL = process.env.REACT_APP_API_URL;
export const PRODUCT_LIST_PAGE_LIMIT = 12;

export const API_ENDPOINT = {
  PRODUCTS: '/api/products',
  SHOPPING_CART: {
    BASE: '/api/carts',
    PRODUCT: '/api/carts/products',
  },
  USER: {
    BASE: '/api/members',
    EMAIL_CHECK: '/api/members/email-check',
    ME: '/api/members/me',
    PASSWORD: '/api/members/password',
    PASSWORD_CHECK: '/api/members/password-check',
  },
  LOGIN: '/api/login',
};
