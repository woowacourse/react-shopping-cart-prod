import { Product } from './product';

import { cartTypes } from 'redux/actions';

import CONDITION from 'constants/condition';

export type Cart = {
  id: number;
  product: Product;
  quantity: number;
};

export type CartAction = {
  type: typeof cartTypes[keyof typeof cartTypes];
  payload?: any;
};

type condition = typeof CONDITION[keyof typeof CONDITION];

export type CartStoreState = {
  condition: condition;
  cartItems: Array<Cart>;
  checkedCartItems: Array<Cart['id']>;
};
