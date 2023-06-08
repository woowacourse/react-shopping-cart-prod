import type { ProductType } from '../types/product';
import type { HostNameType } from '../types/server';

import { servers } from '../constants/server';
import fetchWithHeaders from '.';

export const getProducts = async (hostName: HostNameType) => {
  const hostURL = servers[hostName];

  const response = await fetchWithHeaders(`${hostURL}/products`, 'GET');
  const data: ProductType[] = await response.json();

  return data;
};
