import { clearCache, caching } from '@/api/cache';
import { CART_API_URL } from '@/api/constants';
import axios from 'axios';
import { getCookie } from './cookie';

const cartAPI = axios.create({
  baseURL: CART_API_URL.TO_CART_ITEMS,
});

const authorizedFetcher = ({
  apiCallback,
  path,
  body = null,
  cachePath,
  options = {},
}: {
  apiCallback: any;
  path: string;
  body?: any;
  cachePath: string;
  options?: any;
}) => {
  const accessToken = getCookie('access-token');
  const config = {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  clearCache(`${cachePath}_${accessToken}`);

  if (body) return apiCallback(path, body, config);

  return apiCallback(path, config);
};

export const addCart = async (body): Promise<any> => {
  return authorizedFetcher({
    apiCallback: cartAPI.post,
    path: '/',
    body,
    cachePath: CART_API_URL.TO_CART_ITEMS,
  });
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
  return authorizedFetcher({
    apiCallback: cartAPI.delete,
    path: `/${id}`,
    cachePath: CART_API_URL.TO_CART_ITEMS,
  });
};

export const patchCart = async (id, quantity): Promise<any> => {
  return authorizedFetcher({
    apiCallback: cartAPI.patch,
    path: `/${id}`,
    body: {},
    cachePath: CART_API_URL.TO_CART_ITEMS,
    options: { params: { quantity } },
  });
};
