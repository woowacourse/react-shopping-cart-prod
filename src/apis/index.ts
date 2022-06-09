import axios from 'axios';

export const BASE_URL = 'http://13.124.173.149:8080';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
