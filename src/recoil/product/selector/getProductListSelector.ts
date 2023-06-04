import { selector } from 'recoil';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { getProductListApi } from '@utils/productList/fetchProductList';
import { ProductItemType } from '@type/productType';

export const getProductListSelector = selector<ProductItemType[]>({
  key: 'getProductList',
  get: async ({ get }) => {
    const userInfo = get(userState);
    const serverName = get(serverState);
    const productList = getProductListApi({ serverName, userInfo });

    return productList;
  },
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
});
