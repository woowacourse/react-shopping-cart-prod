import { atom } from 'recoil';
import { CartItemType } from '@type/cartType';
import { getCartListSelector } from './selector/getCartListSelector';

const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: getCartListSelector,
});

export default cartState;
