import { caching } from '@/api/cache';
import { CART_API_URL } from '@/api/constants';
import axios from 'axios';
import { authorizedFetcher } from './authorizedFetcher';
import { getCookie } from './cookie';

const cartAPI = axios.create({
  baseURL: CART_API_URL.TO_CART_ITEMS,
});

export const addCart = async (body): Promise<any> => {
  return authorizedFetcher({
    requestMethod: cartAPI.post,
    endPoint: '/',
    body,
    cachePath: CART_API_URL.TO_CART_ITEMS,
  });
};

export const getCart = () => {
  const accessToken = getCookie('access-token');

  return caching(async (): Promise<any> => {
    return authorizedFetcher({
      requestMethod: cartAPI.get,
      endPoint: '/',
      isLogged: true,
      isOnlyConfig: true,
    });
  }, `${CART_API_URL.TO_CART_ITEMS}_${accessToken}`);
};

export const deleteCart = async (id): Promise<any> => {
  return authorizedFetcher({
    requestMethod: cartAPI.delete,
    endPoint: `/${id}`,
    cachePath: CART_API_URL.TO_CART_ITEMS,
    isLogged: true,
    isOnlyConfig: true,
  });
};

export const patchCart = async (id, quantity): Promise<any> => {
  return authorizedFetcher({
    requestMethod: cartAPI.patch,
    endPoint: `/${id}`,
    body: {},
    cachePath: CART_API_URL.TO_CART_ITEMS,
    options: { params: { quantity } },
    isLogged: true,
  });
};
