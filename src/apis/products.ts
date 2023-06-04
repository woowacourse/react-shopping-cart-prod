import { SERVER, ServerKey } from '../constants/server';
import type { Product } from '../types/product';
import { fetchData } from './utils';

const productApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/products`;

  const getProducts = async () => {
    const response = await fetchData({ url, method: 'GET' });
    const products: Product[] = await response.json();
    return products;
  };

  return { getProducts };
};

export default productApis;
