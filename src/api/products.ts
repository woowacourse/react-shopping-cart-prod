import { api } from 'api';

export const getProductList = async (server: string) => {
  const data = await api.get(`${server}/products`);
  return data;
};
