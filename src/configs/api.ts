import Axios from 'axios';
import { getAccessToken } from 'utils/auth';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/api',
});

const axiosWithToken = Axios.create({
  baseURL: 'http://localhost:8080/api',
});

const productAxios = Axios.create({
  baseURL: 'https://heroku-shopping-cart-lv2.herokuapp.com',
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (!!accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios, axiosWithToken, productAxios };
