import { clearCache, caching } from '@/api/cache';
import { CART_API_URL } from '@/api/constants';
import axios from 'axios';

const cartAPI = axios.create({
  baseURL: CART_API_URL.TO_CARTS,
});

const cartListEndpoint = `${CART_API_URL.TO_CARTS}/`;

export const addCart = async (product): Promise<any> => {
  const response = await cartAPI.post('/', product);

  if (response.statusText !== 'Created') {
    throw Error('서버 오류!');
  }

  clearCache(cartListEndpoint);
};

export const getCart = () => {
  return caching(async (): Promise<any> => {
    const response = await cartAPI.get('/');

    if (response.statusText !== 'OK') {
      throw Error('서버 오류!');
    }

    return {
      data: response.data,
    };
  }, cartListEndpoint);
};

export const deleteCart = async (id): Promise<any> => {
  const response = await cartAPI.delete(`/${id}`);
  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  clearCache(cartListEndpoint);
};

export const patchCart = async (id, newCartProduct): Promise<any> => {
  const response = await cartAPI.patch(`/${id}`, newCartProduct);
  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  clearCache(cartListEndpoint);
};
