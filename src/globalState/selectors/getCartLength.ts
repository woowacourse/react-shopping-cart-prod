import { selector } from 'recoil';
import cartState from '../atoms/cartState';

const getCartLength = selector({
  key: 'getCartId',

  get: ({ get }) => get(cartState).length,
});

export default getCartLength;
