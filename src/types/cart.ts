import { Product } from './product';

import { cartTypes } from 'redux/actions';

export type Cart = {
  id: Product['id'];
  quantity: number;
  checked: boolean;
};

export type CartAction = {
  type: typeof cartTypes[keyof typeof cartTypes];
  payload?: any;
};

export type CartStoreState = {
  cart: Array<Cart>;
};

export type CartProductState = {
  product: Product;
  quantity: number;
  checked: boolean;
};
