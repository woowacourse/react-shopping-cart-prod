import { caching } from '@/api/cache';
import { PRODUCT_API_URL } from '@/api/constants';
import { ProductType } from '@/domain/product';
import axios from 'axios';

const productAPI = axios.create({
  baseURL: PRODUCT_API_URL.TO_PRODUCTS,
});

export const cache = {};

export const getProductList = () => {
  const cacheKey = `${PRODUCT_API_URL.TO_PRODUCTS}`;

  return caching(async (): Promise<any> => {
    const response = await productAPI.get('');

    return {
      data: {
        productList: response.data.products,
        totalProductCount: response.data.products.length,
      },
    };
  }, cacheKey);
};

export const getProduct = id => {
  const cacheKey = `${PRODUCT_API_URL.TO_PRODUCTS}/${id}`;

  return caching(async (): Promise<{ data: ProductType }> => {
    const response = await productAPI.get(`/${id}`, {});

    return { data: response.data.product };
  }, cacheKey);
};
