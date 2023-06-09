import { selector } from 'recoil';
import { cartItemSelectedById } from '@utils/cart/cart';
import cartState from '../cartState';

const withTotalCheckedCount = selector({
  key: 'cartCountChecked',
  get: ({ get }) => {
    const cart = get(cartState);

    return cartItemSelectedById(cart).length;
  },
});

export default withTotalCheckedCount;
