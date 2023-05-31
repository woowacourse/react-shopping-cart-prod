import { atom } from 'recoil';
import { CartItemType } from '@type/cartType';

const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: [],
});

export default cartState;
