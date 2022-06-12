import axios from 'axios';
import { authorizedFetcher } from './authorizedFetcher';
import { ORDERS_API_URL } from './constants';

const ordersAPI = axios.create({
  baseURL: ORDERS_API_URL.TO_ORDERS,
});

export const addOrderList = body => {
  return authorizedFetcher({
    requestMethod: ordersAPI.post,
    endPoint: '/',
    body,
  });
};

export const getOrderById = id => {
  return authorizedFetcher({
    requestMethod: ordersAPI.get,
    endPoint: `/${id}`,
    isOnlyConfig: true,
  });
};

export const getAllOrderList = () => {
  return authorizedFetcher({
    requestMethod: ordersAPI.get,
    endPoint: '/',
    isOnlyConfig: true,
  });
};
