import { PRODUCT_PATH } from '@constants/urlConstants';
import serverState, { SERVER } from '@recoil/server/serverState';
import { createApiRequests } from '@utils/createApiRequests';
import { getProductsFetched } from '@views/Product/remote/fetchProductList';
import { atom, selector, useRecoilValue } from 'recoil';
import { ProductItemType } from 'types/ProductType';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: selector({
    key: 'productListState/selector',
    get: async ({ get }) => {
      const server = get(serverState);

      const productList: ProductItemType[] = await createApiRequests(SERVER[server])(
        PRODUCT_PATH
      ).GET();

      return productList;
    },
  }),
});

export const useProductListReadOnly = () => useRecoilValue(productListState);
