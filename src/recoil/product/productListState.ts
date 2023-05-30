import { atomFamily } from 'recoil';
import { fetchGet } from '@utils/fetchUtils';
import { productListApiWrapper } from '@utils/productList/productList';
import { ServerName, getProductPath } from '@constants/serverUrlConstants';
import { ProductItemType, ServerProductItemType } from '@type/productType';

export const productListState = atomFamily<ProductItemType[], ServerName>({
  key: 'productListStateFamily',
  default: async (serverName) => {
    const productList = await fetchGet<ServerProductItemType[]>(getProductPath(serverName));

    const clientProductList = productListApiWrapper(productList);

    return clientProductList;
  },
});
