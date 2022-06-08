//export const LOCAL_BASE_URL = 'http://localhost:4000';
//export const SERVER_URL = 'https://sisyphe-shopping-cart-server.herokuapp.com/';

export const LOCAL_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ec2-52-79-235-135.ap-northeast-2.compute.amazonaws.com:8080';
