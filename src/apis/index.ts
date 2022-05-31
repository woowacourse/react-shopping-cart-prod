import axios from 'axios';

const LOCAL_BASE_URL = process.env.REACT_APP_LOCAL_BASE_URL;
const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;
const AUTH_LOCAL_BASE_URL = process.env.REACT_APP_AUTH_LOCAL_BASE_URL;
const AUTH_PRODUCT_BASE_URL = process.env.REACT_APP_AUTH_PRODUCT_BASE_URL;

export const BASE_URL = process.env.NODE_ENV === 'production' ? PRODUCT_BASE_URL : LOCAL_BASE_URL;

export const AUTH_BASE_URL =
  process.env.NODE_ENV === 'production' ? AUTH_PRODUCT_BASE_URL : AUTH_LOCAL_BASE_URL;

export const client = axios.create({
  baseURL: BASE_URL,
});

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
});
