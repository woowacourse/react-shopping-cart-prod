import { atom } from 'recoil';
import { Product } from '../../types/Product';

export interface CartProductDetail {
  id: number;
  quantity: number;
  product: Product;
}

export const cartItemsState = atom<CartProductDetail[]>({
  key: 'cartItemsState',
  default: [],
});

export const selectedCartIdListState = atom<number[]>({
  key: 'selectedCartIdListState',
  default: [],
});
