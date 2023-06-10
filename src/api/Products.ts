import type { Product } from '../types/product';
import type { ServerName } from '../types/server';
import ServerUtil from '../utils/ServerUrl';

const getAllList = async (serverName: ServerName): Promise<Product[]> => {
  const url = ServerUtil.getProductsUrl(serverName);

  const response = await fetch(url, {
    method: 'GET',
  });

  if (response.status !== 200) throw new Error('상품 목록 조회에 실패했어요.');

  const products: Product[] = await response.json();

  return products;
};

const ProductsApi = { getAllList };

export default ProductsApi;
