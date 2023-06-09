import { selector } from 'recoil';
import { calculateSelectCartTotalPrice } from '@utils/cart/cart';
import cartState from '../cartState';

const withCartTotalPrice = selector({
  key: 'withCartTotalPrice',
  get: ({ get }) => {
    const cart = get(cartState);

    return calculateSelectCartTotalPrice(cart);
  },
});

export default withCartTotalPrice;
