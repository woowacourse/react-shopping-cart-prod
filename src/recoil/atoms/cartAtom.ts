import { atom, atomFamily } from 'recoil';
import { Product } from '../../types/Product';
import { base64 } from '../../constants/user';

export interface CartItemDetail {
  id: number;
  quantity: number;
  product: Product;
}

export const cartItemsState = atomFamily<CartItemDetail[], string>({
  key: 'cartItemsState',
  default: [],
  effects: (apiEndPoint) => [
    ({ setSelf, trigger }) => {
      const getCartItems = () => {
        const response = fetch(`${apiEndPoint}/cart-items`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json() as Promise<CartItemDetail[]>);

        setSelf(response);
      };

      if (trigger === 'get') getCartItems();
    },
  ],
});

export const selectedCartIdListState = atom<number[]>({
  key: 'selectedCartIdListState',
  default: [],
});
