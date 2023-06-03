import { atom, selectorFamily } from 'recoil';
import { CartProducts, Product } from 'types/product';
import { getCartProducts } from 'apis/cart';

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: getCartProducts(),
});

export const checkedCartProductsTotalPrice = selectorFamily<number, Set<Product['id']>>({
  key: 'cartTotalPriceState',
  get:
    (checkedProducts) =>
    ({ get }) => {
      const cartProducts = get(cartProductsState);

      return [...cartProducts.entries()].reduce((acc, [cartProductId, { product, quantity }]) => {
        if (!checkedProducts.has(cartProductId)) return acc;

        return acc + product.price * quantity;
      }, 0);
    },
});
