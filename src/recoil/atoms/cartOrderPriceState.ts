import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import cartItemsState from './cartItemsState';

type CartOrderPriceState = {
  products: number;
  shippingFee: number;
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
      const shippingFee = productsPrice > 0 ? 3000 : 0;

      const prices = {
        products: productsPrice,
        shippingFee,
      };

      return {
        ...prices,
        total: Object.values(prices).reduce((sum, current) => sum + current, 0),
      };
    },
});

export default cartOrderPriceState;
