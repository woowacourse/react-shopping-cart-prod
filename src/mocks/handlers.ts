import {
  deleteCartItems,
  getCartItems,
  getProducts,
  patchCartItems,
  postCartItems,
  postOrders,
} from './api';

export const handlers = [
  getProducts,
  postCartItems,
  patchCartItems,
  getCartItems,
  deleteCartItems,
  postOrders,
];
