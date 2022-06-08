import { caching } from '@/api/cache';
import { API_URL } from '@/api/constants';
import { ProductType } from '@/domain/product';
import https from 'https';
import axios from 'axios';
export const cache = {};
const productAPI = axios.create({
  baseURL: `${API_URL}/products`,
});

export const getProductList = () => {
  const cacheKey = `${API_URL}/products`;

  return caching((): Promise<any> => {
    return productAPI.get('', {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, //허가되지 않은 인증을 reject하지 않겠다!
      }),
    });
  }, cacheKey);
};

export const getProduct = id => {
  const cacheKey = `${API_URL}/products/${id}`;

  return caching((): Promise<{ data: ProductType }> => {
    return productAPI.get(`/${id}`);
  }, cacheKey);
};
