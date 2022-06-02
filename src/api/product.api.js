import customInstance from 'api/customInstance';

import { API_ENDPOINT, PRODUCT_LIST_PAGE_LIMIT } from 'constants';

export const sendGetProductListRequest = async (page) => {
  const response = await customInstance.get(`${API_ENDPOINT.PRODUCTS}`, {
    params: {
      _page: page,
      _limit: PRODUCT_LIST_PAGE_LIMIT,
    },
  });

  const productList = response.data;
  const totalProductCount = response.headers['x-total-count'];

  return { productList, totalProductCount };
};
