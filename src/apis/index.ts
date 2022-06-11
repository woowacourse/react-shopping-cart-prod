import axios from 'axios';

export const BASE_URL = 'http://13.124.173.149:8080';

// 아서 http://13.124.173.149:8080
// 승팡 http://3.37.123.166:8080
// 페퍼 http://13.124.187.203:8080
// 앤지 http://3.39.195.12:8080

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
