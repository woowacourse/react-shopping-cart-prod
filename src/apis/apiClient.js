import axios from 'axios';
import { ENV } from 'utils/constants';
import { getCookie } from 'utils/cookie';

const AUTH_API_URL = {
  이프: 'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080',
  찬: 'http://ec2-3-34-130-116.ap-northeast-2.compute.amazonaws.com:8080',
  더즈: 'http://ec2-15-164-211-129.ap-northeast-2.compute.amazonaws.com:8080',
  토르: 'http://ec2-15-164-232-166.ap-northeast-2.compute.amazonaws.com:8080',
};

export const isApiTest = true;
const selectedApiName = '이프';
if (isApiTest) {
  console.log(`${selectedApiName}의 API로 연결하였습니다.`);
} else {
  console.log('실제 Api로 연결하지 않고 MSW로 동작합니다.');
}

const accessToken = getCookie('accessToken');

const apiClient = axios.create({
  // baseURL: process.env.NODE_ENV === ENV.DEVELOPMENT && AUTH_API_URL.이프,
  baseURL: isApiTest && AUTH_API_URL[selectedApiName],
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export default apiClient;
