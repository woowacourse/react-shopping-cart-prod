import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;
export const AUTH_BASE_URL = process.env.REACT_APP_AUTH_PRODUCT_BASE_URL;

export const client = axios.create({
  baseURL: BASE_URL,
});

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
