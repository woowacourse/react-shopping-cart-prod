import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import cartItemsState from './cartItemsState';

type CartOrderPriceState = {
  products: number;
  total: number;
};

const cartOrderPriceState = selectorFamily<CartOrderPriceState, Client>({
  key: 'cartOrderPriceState',
  get:
    (client) =>
    ({ get }) => {
      const cartItems = get(cartItemsState(client));

      const productsPrice = cartItems
        .filter((cartItem) => cartItem.checked)
        .reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.product.price, 0);

      const prices = {
        products: productsPrice,
      };

      return {
        ...prices,
        total: Object.values(prices).reduce((sum, current) => sum + current, 0),
      };
    },
});

export default cartOrderPriceState;
