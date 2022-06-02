import axios from 'axios';

export const BASE_URL = "http://localhost:4000";
export const AUTH_BASE_URL = "http://localhost:4000";

export const client = axios.create({
  baseURL: BASE_URL,
});

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
