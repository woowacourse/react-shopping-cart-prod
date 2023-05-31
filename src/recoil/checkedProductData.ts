import { atom, selector } from 'recoil';

import { cartAtom } from './cartProductData';

export const checkedCartItemIdsAtom = atom<number[]>({
  key: 'checkedItemState',
  default: [],
});

export const checkedListSelector = selector<number>({
  key: 'checkedListState',
  get: ({ get }) => {
    const checkedCartItemIds = get(checkedCartItemIdsAtom);

    return checkedCartItemIds.length;
  },
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceState',
  get: ({ get }) => {
    const checkedCartItemIds = get(checkedCartItemIdsAtom);
    const cartItems = get(cartAtom).cartItems;
    const checkedCartItems = cartItems.filter((item) =>
      checkedCartItemIds.includes(item.cartItemId)
    );
    const totalPrice = checkedCartItems.reduce(
      (total, { quantity, product }) => {
        return total + quantity * product.price;
      },
      0
    );

    return totalPrice;
  },
});
