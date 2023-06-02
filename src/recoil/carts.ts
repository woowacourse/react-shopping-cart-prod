import { getCartList, getPriceResult } from 'api/cart';
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

export const priceAtom = atom({
  key: 'priceAtom',
  default: selector({
    key: 'initialPrice',
    get: async ({ get }) => {
      const server = get(serverAtom);
      const data = await getPriceResult(2)(server);
      return data;
    },
  }),
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);
    const priceList = get(priceAtom);
    const checkedItems = get(checkedItemsAtom);
    const { cartItemsPrice } = priceList;

    return cartItemsPrice
      .filter((item) => checkedItems.includes(item.cartItemId))
      .reduce((acc, item) => {
        const quantity =
          cartList.find((cartItem) => cartItem.id === item.cartItemId)
            ?.quantity || 1;
        return acc + item.originalPrice * quantity;
      }, 0);
  },
});

export const totalDiscountPriceSelector = selector({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);
    const priceList = get(priceAtom);
    const checkItems = get(checkedItemsAtom);
    const { cartItemsPrice, discountFromTotalPrice } = priceList;

    const discountSum = cartItemsPrice
      .filter((item) => checkItems.includes(item.cartItemId))
      .reduce((acc, item) => {
        const quantity =
          cartList.find((cartItem) => cartItem.id === item.cartItemId)
            ?.quantity || 1;
        return acc + item.discountPrice * quantity;
      }, 0);

    return discountSum + discountFromTotalPrice.discountPrice;
  },
});
