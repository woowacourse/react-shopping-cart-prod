import { atom } from 'recoil';
import type { CartProduct } from '../../types/product';
import fetchCartItemList from '../selectors/fetchCartItemList';

const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: fetchCartItemList,
});

export default cartState;
