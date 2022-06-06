import axios from 'axios';
import { getCookie } from '../utils/cookie';

const { REACT_APP_AUTH_API_URL } = process.env;
const { REACT_APP_PRODUCT_API_URL } = process.env;

const accessToken = getCookie('accessToken');

export const authApiClient = axios.create({
  baseURL: REACT_APP_AUTH_API_URL,
  headers: { Authorization: `Bearer ${accessToken}`, withCredentials: true },
});

export const productApiClient = axios.create({
  baseURL: REACT_APP_PRODUCT_API_URL,
});
