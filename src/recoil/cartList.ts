import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { CartId, Cart } from 'types';
import { getLocalStorageData } from 'utils/storage';

export const cartListAtom = atom<Cart[]>({
  key: 'cartList',
  default: getLocalStorageData<Cart[]>('cartList'),
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

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (cartId: CartId) =>
    ({ get }) => {
      const cartItem = get(cartListAtom).find(({ id }) => id === cartId);
      return cartItem ?? null;
    },

  set:
    (cartId: CartId) =>
    ({ get, set }, item) => {
      if (!item || item instanceof DefaultValue) return;
      const cartList = get(cartListAtom);
      const cartItem = cartList.find(({ id }) => id === cartId);

      if (!cartItem) {
        set(cartListAtom, [...cartList, item]);
        return;
      }

      if (item.quantity === 0) {
        set(
          cartListAtom,
          cartList.filter(({ id }) => id !== cartId)
        );
        return;
      }

      set(
        cartListAtom,
        cartList.map((prev) => (prev.id === cartId ? item : prev))
      );
    },
});
