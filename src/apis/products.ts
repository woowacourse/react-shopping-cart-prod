import { servers } from '../constants/server';
import { fetchData } from '../utils/apiUtils';
import type { Product } from '../types/product';
import type { HostNameType } from '../types/server';

export const fetchProducts = async (hostName: HostNameType) => {
  const hostURL = servers[hostName];
  const URL = `${hostURL}/products`;

  const response: Product[] = await fetchData<Product[]>(URL);
  return response;
};
