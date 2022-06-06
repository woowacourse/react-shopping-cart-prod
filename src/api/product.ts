import { caching } from '@/api/cache';
import { PRODUCT_API_URL, PRODUCT_LIST_PAGE_LIMIT } from '@/api/constants';
import { ProductType } from '@/domain/product';
import axios from 'axios';
export const cache = {};
const productAPI = axios.create({
  baseURL: PRODUCT_API_URL.TO_PRODUCTS,
});

export const getProductList = page => {
  const cacheKey = `${PRODUCT_API_URL.TO_PRODUCTS}?_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`;

  return caching(async (): Promise<any> => {
    const response = await productAPI.get('', {
      params: { _page: page, _limit: PRODUCT_LIST_PAGE_LIMIT },
    });

    if (response.statusText !== 'OK') {
      throw Error('서버 오류!');
    }

    return {
      data: { productList: response.data, totalProductCount: response.headers['x-total-count'] },
    };
  }, cacheKey);
};

export const getProduct = id => {
  const cacheKey = `${PRODUCT_API_URL.TO_PRODUCTS}/${id}`;

  return caching(async (): Promise<{ data: ProductType }> => {
    const response = await productAPI.get(`/${id}`, {});
    if (response.statusText !== 'OK') {
      throw Error('서버 오류!');
    }

    return { data: response.data };
  }, cacheKey);
};
