import { request } from 'lib/requestUtils';

const requestGetProductList = (page = 1) =>
  request(`/products?page=${page}&limit=36`, { method: 'GET' });

export { requestGetProductList };
