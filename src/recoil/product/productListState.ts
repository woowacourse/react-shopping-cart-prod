import { atom, useRecoilValue } from 'recoil';
import { ProductItemType } from '@type/ProductType';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: [],
});

export const useRecoilProductListReadOnly = () => useRecoilValue(productListState);
