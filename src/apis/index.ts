import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
