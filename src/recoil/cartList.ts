import { getCartList } from 'api/cart';
import { atom, selector } from 'recoil';
import { serverAtom } from './server';
import { CartItem } from 'types/api/carts';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartList',
  default: selector({
    key: 'initialCartList',
    get: async ({ get }) => {
      const server = get(serverAtom);
      const data = await getCartList(server);
      return data;
    },
  }),
});

export const checkedItemsAtom = atom<number[]>({
  key: 'checkedItemsAtom',
  default: selector({
    key: 'initialCheckedList',
    get: ({ get }) => {
      const cart = get(cartListAtom);

      return cart.map((item) => item.id);
    },
  }),
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return get(cartListAtom).length;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);
    const checkedItems = get(checkedItemsAtom);

    return cartList
      .filter((item) => checkedItems.includes(item.id))
      .reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
  },
});
