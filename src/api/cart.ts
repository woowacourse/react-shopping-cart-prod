import { clearCache, caching } from '@/api/cache';
import { CART_API_URL } from '@/api/constants';
import axios from 'axios';
import { getCookie } from './cookie';

const cartAPI = axios.create({
  baseURL: CART_API_URL.TO_CART_ITEMS,
});

export const addCart = async (body): Promise<any> => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  clearCache(`${CART_API_URL.TO_CART_ITEMS}_${accessToken}`);

  return cartAPI.post('/', body, config);
};

export const getCart = () => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return caching(async (): Promise<any> => {
    return cartAPI.get('/', config);
  }, `${CART_API_URL.TO_CART_ITEMS}_${accessToken}`);
};

export const deleteCart = async (id): Promise<any> => {
  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  clearCache(`${CART_API_URL.TO_CART_ITEMS}_${accessToken}`);
  return cartAPI.delete(`/${id}`, config);
};

export const patchCart = async (id, quantity): Promise<any> => {
  const accessToken = getCookie('access-token');
  const config = {
    params: {
      quantity,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  clearCache(`${CART_API_URL.TO_CART_ITEMS}_${accessToken}`);

  return cartAPI.patch(`/${id}`, {}, config);
};
