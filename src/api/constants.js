export const PRODUCT_LIST_PAGE_LIMIT = 12;

export const API_URLS = [
  { name: '크리스', url: 'http://15.164.170.161:8080' },
  { name: '오찌', url: 'http://43.200.3.154:8080' },
  {
    name: '쿼리치',
    url: 'http://ec2-13-125-173-161.ap-northeast-2.compute.amazonaws.com:8080',
  },
  {
    name: '파랑',
    url: 'http://13.124.20.12:8080',
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
