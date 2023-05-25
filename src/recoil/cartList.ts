import { getCartList } from 'api/requests';
import { atom, selector } from 'recoil';
import { Cart } from 'types';
import { SERVERS } from 'utils/constants';

export const cartListAtom = atom<Cart[]>({
  key: 'cartList',
  default: selector({
    key: 'initialCartList',
    get: async () => {
      const data = await getCartList(SERVERS['여우']);
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
