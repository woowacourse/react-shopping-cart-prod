import { cartTypes } from 'redux/actions';

import { Product } from './product';

export type Cart = {
  id: string;
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
