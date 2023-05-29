import { selectorFamily } from 'recoil';
import { fetchGet } from '@utils/fetchUtils';
import { productListApiWrapper } from '@utils/productList/productList';
import { ServerName, getProductPath } from '@constants/serverUrlConstants';
import { ProductItemType, ServerProductItemType } from '@type/productType';

export const getProductListSelector = selectorFamily<ProductItemType[], ServerName>({
  key: 'getProductList',
  get: (serverName) => async () => {
    const productList = await fetchGet<ServerProductItemType[]>(getProductPath(serverName));

    const clientProductList = productListApiWrapper(productList);

    return clientProductList;
  },
});
