import { atom } from 'recoil';
import type { CartProduct } from '../../types/product';
import fetchCartItems from '../selectors/fetchCartItems';

const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: fetchCartItems,
});

export default cartState;
