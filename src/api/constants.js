export const PRODUCT_LIST_PAGE_LIMIT = 12;

export const API_URLS = [
  { name: '크리스', url: process.env.REACT_APP_API_URL_CHRIS },
  { name: '오찌', url: process.env.REACT_APP_API_URL_OZZI },
  {
    name: '쿼리치',
    url: process.env.REACT_APP_API_URL_QUERYCHI,
  },
  {
    name: '파랑',
    url: process.env.REACT_APP_API_URL_PARANG,
  },
];

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
