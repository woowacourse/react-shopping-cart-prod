import { clearCache, caching } from '@/api/cache';
import { API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

const orderAPI = axios.create({
  baseURL: `${API_URL}/orders`,
});

export const addOrder = (body): Promise<any> => {
  const accessToken = getCookie('access-token');

  clearCache(`${API_URL}/orders_${accessToken}`);

  return orderAPI.post('/', body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getOrders = (): Promise<any> => {
  const accessToken = getCookie('access-token');

  return caching(() => {
    return orderAPI.get(`/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, `${API_URL}/orders_${accessToken}`);
};

export const getOrder = async (id): Promise<any> => {
  const accessToken = getCookie('access-token');

  return caching(() => {
    return orderAPI.get(`/${id}`, {
      params: {
        orderId: id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, `${API_URL}/orders/${id}_${accessToken}`);
};
