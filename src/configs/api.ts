import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/api',
});

const productAxios = Axios.create({
  baseURL: 'https://heroku-shopping-cart-lv2.herokuapp.com',
});

export { axios, productAxios };
