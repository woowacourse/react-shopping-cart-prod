import axios from 'axios';
import { ENV } from 'utils/constants';
import { getCookie } from 'utils/cookie';

const accessToken = getCookie('accessToken');

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === ENV.PRODUCTION &&
    'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080',
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export default apiClient;
