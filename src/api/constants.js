export const API_URL = process.env.REACT_APP_API_URL;

export const PRODUCT_LIST_PAGE_LIMIT = 12;

export const API_ENDPOINT = {
  PRODUCTS: '/api/products',
  SHOPPING_CART: '/api/carts',
  USER: '/api/members',
  LOGIN: '/api/login',
  AUTH: {
    ME: '/api/members/auth/me',
    PASSWORD: '/api/members/auth/password',
    PASSWORD_CHECK: '/api/members/auth/password-check',
  },
};
