import { atom, selector, selectorFamily } from 'recoil';
import { CartProducts, Product } from 'types/product';
import { getCartProducts } from 'apis/cart';
import { userState } from './userState';

const defaultCartState = selector({
  key: 'defaultCartState',
  get: ({ get }) => {
    const { id, password } = get(userState); // Replace `userIdState` with your Recoil atom representing the user ID

    return getCartProducts({ id, password });
  },
});

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: defaultCartState,
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

