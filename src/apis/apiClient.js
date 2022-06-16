import axios from 'axios';
import { AUTH_API_URL, ENV } from 'utils/constants';
import { getCookie } from 'utils/cookie';

const accessToken = getCookie('accessToken');
const name = localStorage.getItem('api_name') || '이프';

class apiClientClass {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NODE_ENV === ENV.PRODUCTION && AUTH_API_URL[name],
      headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
    });
  }

  setBaseURL(url) {
    this.axios.defaults.baseURL = url;
  }

  setAuth(accessToken) {
    this.axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
}

const apiClient = new apiClientClass();

export default apiClient;
