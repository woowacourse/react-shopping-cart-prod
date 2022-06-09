export const LOCAL_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://sisyphe-shopping-cart-server.herokuapp.com';

export const BACK_URL = {
  LOCAL: LOCAL_BASE_URL,
  ALIN: 'https://ec2-52-79-235-135.ap-northeast-2.compute.amazonaws.com:8080',
  GREEN: 'https://ec2-52-79-233-208.ap-northeast-2.compute.amazonaws.com:8080',
  LENUN: 'https://ec2-54-180-79-12.ap-northeast-2.compute.amazonaws.com:8080',
  ALPHA: 'https://ec2-52-79-235-137.ap-northeast-2.compute.amazonaws.com:8080',
  COOKIE: 'https://ec2-3-35-210-168.ap-northeast-2.compute.amazonaws.com:8080',
};

export const BASE_URL = BACK_URL.COOKIE;
