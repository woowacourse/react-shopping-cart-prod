import { selector } from 'recoil';
import { calculateSelectCartTotalPrice } from '@utils/cart/cart';
import cartState from '../cartState';

const cartTotalPriceState = selector({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);

    return calculateSelectCartTotalPrice(cart);
  },
});

export default cartTotalPriceState;
