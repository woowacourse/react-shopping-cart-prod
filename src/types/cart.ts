import { Product } from './product';
import { cartTypes } from 'redux/actions';

export type Cart = {
  id: number;
  quantity: number;
  product: Product;
};

export type CartAction = {
  type: typeof cartTypes[keyof typeof cartTypes];
  payload?: any;
};

export type CartStoreState = {
  cart: Array<Cart>;
};
