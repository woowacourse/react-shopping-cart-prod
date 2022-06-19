//export const LOCAL_BASE_URL = 'http://localhost:4000';
//export const SERVER_URL = 'https://sisyphe-shopping-cart-server.herokuapp.com/';

const teamDomain = {
  알린: 'https://ec2-52-79-235-135.ap-northeast-2.compute.amazonaws.com:8080',
  칙촉: 'https://ec2-3-35-210-168.ap-northeast-2.compute.amazonaws.com:8080',
  레넌: 'https://ec2-54-180-79-12.ap-northeast-2.compute.amazonaws.com:8080',
  그린: 'https://ec2-52-79-233-208.ap-northeast-2.compute.amazonaws.com:8080',
  알파: 'https://ec2-52-79-235-137.ap-northeast-2.compute.amazonaws.com:8080',
};

export const LOCAL_BASE_URL =
  /*process.env.NODE_ENV === 'development'
     //? 'http://localhost:3000'
    */ teamDomain.그린;
