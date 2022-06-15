import { clearCache, caching } from '@/api/cache';
import { API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

const cartAPI = axios.create({
  baseURL: `${API_URL}/cartItems`,
});

export const addCart = (body): Promise<any> => {
  const accessToken = getCookie('access-token');

  clearCache(`${API_URL}/cartItems_${accessToken}`);

  return cartAPI.post('/', body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCart = () => {
  const accessToken = getCookie('access-token');

  return caching(() => {
    return cartAPI.get('/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, `${API_URL}/cartItems_${accessToken}`);
};

export const deleteCart = (id): Promise<any> => {
  const accessToken = getCookie('access-token');

  clearCache(`${API_URL}/cartItems_${accessToken}`);

  return cartAPI.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const patchCart = async (id, quantity): Promise<any> => {
  const accessToken = getCookie('access-token');

  clearCache(`${API_URL}/cartItems_${accessToken}`);

  return cartAPI.patch(
    `/${id}`,
    {},
    {
      params: {
        quantity,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
