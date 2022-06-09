import axios from 'axios';

import { AUTH_API_URL, ENV } from 'utils/constants';
import { getCookie } from 'utils/cookie';

const accessToken = getCookie('accessToken');

const name = localStorage.getItem('api_name');
const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === ENV.PRODUCTION && AUTH_API_URL[name],
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export default apiClient;
