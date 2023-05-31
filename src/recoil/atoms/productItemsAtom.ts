import { atom } from 'recoil';
import { base64 } from '../../constants/user';
import { Product } from '../../types/Product';

export const productItemsState = atom<Product[]>({
  key: 'productItemsState',
  default: [],
  effects: [
    ({ setSelf, trigger }) => {
      const getProductItems = () => {
        const productItems = fetch(`/products`, {
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
