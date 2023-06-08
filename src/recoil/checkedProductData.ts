import { atom, selector } from 'recoil';
import { cartProductAtom } from './cartProductData';

export const checkedItemAtom = atom<number[]>({
  key: 'checkedItemState',
  default: [],
});

export const checkedListSelector = selector<number>({
  key: 'checkedListState',
  get: ({ get }) => {
    const checkedItem = get(checkedItemAtom);

    return checkedItem.length;
  },
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceState',
  get: ({ get }) => {
    const checkedCartProductIds = get(checkedItemAtom);
    const cartProducts = get(cartProductAtom);

    const totalPrice = checkedCartProductIds.reduce((total, cartProductId) => {
      const checkedCartProduct = cartProducts.find(
        (product) => product.cartItemId === cartProductId
      );

      if (!checkedCartProduct) {
        return total;
      }

      return (
        total + checkedCartProduct.quantity * checkedCartProduct.product.price
      );
    }, 0);
    return totalPrice;
  },
});
