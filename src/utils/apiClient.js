import axios from 'axios';

const { REACT_APP_AUTH_API_URL } = process.env;
const { REACT_APP_PRODUCT_API_URL } = process.env;

export const authApiClient = axios.create({
  baseURL: REACT_APP_AUTH_API_URL,
  responseType: 'json',
  withCredentials: true,
});

export const productApiClient = axios.create({
  baseURL: REACT_APP_PRODUCT_API_URL,
  responseType: 'json',
  withCredentials: true,
});
