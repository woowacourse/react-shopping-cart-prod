import { atom, selector } from 'recoil';
import { CartProducts } from 'types/product';
import { getCartProducts } from 'apis/cart';
import { checkedCartProductIdsState } from './checkedCartProductIds';

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: getCartProducts(),
});

export const checkedCartProductsTotalPriceState = selector({
  key: 'checkedCartTotalPriceState',
  get: ({ get }) => {
    const checkedProductIds = get(checkedCartProductIdsState);
    const cartProducts = get(cartProductsState);

    return [...cartProducts.entries()].reduce((acc, [cartProductId, { product, quantity }]) => {
      if (!checkedProductIds.has(cartProductId)) return acc;

      return acc + product.price * quantity;
    }, 0);
  },
});
