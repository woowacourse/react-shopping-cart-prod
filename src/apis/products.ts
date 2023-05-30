import { SERVER, ServerKey } from '../constants/server';
import type { Product } from '../types/product';
import { getData } from './utils';

const productApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/products`;

  const getProducts = () => {
    return getData<Product[]>({ url });
  };

  return { getProducts };
};

export default productApis;
