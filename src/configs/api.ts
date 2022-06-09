import Axios from 'axios';

const axios = Axios.create({
  // 매트
  baseURL:
    'http://ec2-15-164-94-21.ap-northeast-2.compute.amazonaws.com:8080/api',
  // 야호
  // baseURL:
  //   'http://ec2-13-125-121-5.ap-northeast-2.compute.amazonaws.com:8080/api',
  // 차리
  // baseURL:
  //   'http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/api',
  // 슬로
  // baseURL:
  //   'http://ec2-15-164-49-241.ap-northeast-2.compute.amazonaws.com:8080/api',
});

export default axios;
