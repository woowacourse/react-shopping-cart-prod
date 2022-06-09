export const API_URL = [
  'http://15.164.170.161:8080',
  'http://43.200.3.154:8080',
  'http://ec2-13-125-173-161.ap-northeast-2.compute.amazonaws.com:8080',
  'http://13.124.20.12:8080',
  'https://thawing-fortress-83192.herokuapp.com',
];

export const PRODUCT_LIST_PAGE_LIMIT = 12;

export const API_ENDPOINT = {
  PRODUCTS: '/api/products',
  CARTS: '/api/carts',
  CARTS_PRODUCTS: '/api/carts/products',
  LOGIN: '/api/login',
  MEMBERS: '/api/members',
  EMAIL_CHECK: '/api/members/email-check',
  AUTH: {
    ME: '/api/members/me',
    PASSWORD: '/api/members/password',
    PASSWORD_CHECK: '/api/members/password-check',
  },
};
