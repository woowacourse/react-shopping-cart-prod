import { useRecoilValue } from 'recoil';
import { productListState } from '@recoil/product/productListState';
import serverState from '@recoil/server/serverState';

export const useProductListReadOnly = () => {
  const serverName = useRecoilValue(serverState);

  return useRecoilValue(productListState(serverName));
};
