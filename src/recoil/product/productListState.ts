import { atomFamily } from 'recoil';
import { ProductItemType } from '@type/productType';
import { getProductListSelector } from './selector/getProductListSelector';
import { ServerName } from '@constants/serverUrlConstants';

export const productListState = atomFamily<ProductItemType[], ServerName>({
  key: 'productListStateFamily',
  default: (serverName) => getProductListSelector(serverName),
});
