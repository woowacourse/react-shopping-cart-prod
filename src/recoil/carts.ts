import { getCartList, getPrice } from 'api/cart';
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

export const countCartListSelector = selector<number>({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return get(cartListAtom).length;
  },
});

export const couponAtom = atom<number[]>({
  key: 'couponAtom',
  default: [],
});

export const priceAtom = atom({
  key: 'priceAtom',
  default: selector({
    key: 'initialPrice',
    get: async ({ get }) => {
      const server = get(serverAtom);
      const data = await getPrice('')(server);
      return data;
    },
  }),
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const { cartItemsPrice } = get(priceAtom);
    const cartList = get(cartListAtom);
    const checkedItems = get(checkedItemsAtom);

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

export const totalDiscountPriceSelector = selector<number>({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const { cartItemsPrice, discountFromTotalPrice } = get(priceAtom);
    const cartList = get(cartListAtom);
    const checkItems = get(checkedItemsAtom);

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
