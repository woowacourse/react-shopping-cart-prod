import { useRecoilValue } from 'recoil';
import { productListState } from '@recoil/product/productListState';

export const useProductListReadOnly = () => {
  return useRecoilValue(productListState);
};
