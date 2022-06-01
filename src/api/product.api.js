import { API_ENDPOINT, PRODUCT_LIST_PAGE_LIMIT } from './constants';
import apiInstance from './customInstance';

export const getProductList = async (page) => {
  const pageQuery = `?_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`;

  const response = await apiInstance.get(`${API_ENDPOINT.PRODUCTS}${pageQuery}`);

  const productList = response.data;
  const totalProductCount = response.headers['x-total-count'];

  return { productList, totalProductCount };
};
