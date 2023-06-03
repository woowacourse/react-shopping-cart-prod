import { selector } from 'recoil';
import { CartProducts, Product } from 'types/product';
import { cartProductsState } from './cartProducts';

type CartProductIdStoreState = Record<Product['id'], number>;

export const cartProductIdStoreState = selector<CartProductIdStoreState>({
  key: 'cartProductIdStoreState',
  get: ({ get }) => {
    const cartProducts = get(cartProductsState);

    return cartProductIdParser(cartProducts);
  },
});

const cartProductIdParser = (cartProducts: CartProducts): CartProductIdStoreState => {
  const cartProductIdStore: CartProductIdStoreState = {};

  const productIds = [...cartProducts.values()].map(({ product }) => product.id);
  const cartProductIds = [...cartProducts.keys()];

  productIds.forEach((productId, idx) => (cartProductIdStore[productId] = cartProductIds[idx]));

  return cartProductIdStore;
};
