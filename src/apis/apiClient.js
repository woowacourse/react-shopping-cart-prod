import axios from 'axios';
import { ENV } from 'utils/constants';
import { getCookie } from 'utils/cookie';

export const AUTH_API_URL = {
  이프: 'http://ec2-13-125-41-7.ap-northeast-2.compute.amazonaws.com:8080',
  찬: 'http://ec2-3-34-130-116.ap-northeast-2.compute.amazonaws.com:8080',
  더즈: 'http://ec2-15-164-211-129.ap-northeast-2.compute.amazonaws.com:8080',
  토르: 'http://ec2-15-164-232-166.ap-northeast-2.compute.amazonaws.com:8080',
};

const accessToken = getCookie('accessToken');

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === ENV.PRODUCTION && AUTH_API_URL.이프,
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export default apiClient;
