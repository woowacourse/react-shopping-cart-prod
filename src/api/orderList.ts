import axios from 'axios';
import { ORDERS_API_URL } from './constants';
import { getCookie } from './cookie';

const ordersAPI = axios.create({
  baseURL: ORDERS_API_URL.TO_ORDERS,
});

export const addOrderList = body => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return ordersAPI.post('/', body, config);
};

export const getOrderById = id => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return ordersAPI.get(`/${id}`, config);
};

export const getAllOrderList = () => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return ordersAPI.get('/', config);
};
