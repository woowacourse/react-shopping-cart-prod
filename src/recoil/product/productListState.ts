import { atom } from 'recoil';
import { ProductItemType } from '@type/productType';
import { getProductListSelector } from './selector/getProductListSelector';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: getProductListSelector,
});
