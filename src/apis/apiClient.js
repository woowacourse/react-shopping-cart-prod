import axios from 'axios';
import { getCookie } from 'utils/cookie';

export const isApiTest = false;

if (isApiTest) {
  console.log('백엔드 크루의 API로 연결하였습니다.');
} else {
  console.log('실제 Api로 연결하지 않고 MSW로 동작합니다.');
}

const accessToken = getCookie('accessToken');

const apiClient = axios.create({
  baseURL: isApiTest && 'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080',
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export default apiClient;
