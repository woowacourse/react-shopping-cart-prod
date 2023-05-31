import { fetchGet } from '@utils/fetchUtils';
import { ServerName, getProductPath } from '@constants/serverUrlConstants';
import { ServerProductItemType } from '@type/productType';
import { productListApiWrapper } from './productList';

export const getProductList = async (serverName: ServerName) => {
  const serverProductList = await fetchGet<ServerProductItemType[]>(getProductPath(serverName));
  const clientProductList = productListApiWrapper(serverProductList);

  return clientProductList;
};
