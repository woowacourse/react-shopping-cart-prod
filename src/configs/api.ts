import Axios from 'axios';
import { getAccessToken } from 'utils/auth';

const 차리_URL =
  'http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/api';
const 야호_URL =
  'http://ec2-13-125-121-5.ap-northeast-2.compute.amazonaws.com:8080/api';
const 매트_URL =
  'http://ec2-15-164-94-21.ap-northeast-2.compute.amazonaws.com:8080/api';

const axios = Axios.create({
  // 차리
  // baseURL: 차리_URL,
  // 매트
  baseURL: 매트_URL,
  // 야호
  // baseURL: 야호_URL,
});

const axiosWithToken = Axios.create({
  // 차리
  // baseURL: 차리_URL,
  // 매트
  baseURL: 매트_URL,
  // 야호
  // baseURL: 야호_URL,
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (!!accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios, axiosWithToken };
