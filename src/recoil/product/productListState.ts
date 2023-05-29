import { atom } from 'recoil';
import { ProductItemType } from '@type/productType';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: [],
});
