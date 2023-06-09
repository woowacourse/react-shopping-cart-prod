import { atomFamily } from 'recoil';
import { base64 } from '../../constants/user';
import { Product } from '../../types/Product';

export const productItemsState = atomFamily<Product[], string>({
  key: 'productItemsState',
  default: [],
  effects: (apiEndPoint) => [
    ({ setSelf, trigger }) => {
      const getProductItems = () => {
        const productItems = fetch(`${apiEndPoint}/products`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
          },
        }).then((res) => res.json() as Promise<Product[]>);

        setSelf(productItems);
      };

      if (trigger === 'get') getProductItems();
    },
  ],
});
