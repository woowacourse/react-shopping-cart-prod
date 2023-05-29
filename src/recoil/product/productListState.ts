import { atom, useRecoilValue } from 'recoil';
import { ProductItemType } from '@type/productType';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: [],
});

export const useRecoilProductListReadOnly = () => useRecoilValue(productListState);
