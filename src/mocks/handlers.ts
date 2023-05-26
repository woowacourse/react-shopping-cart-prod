import {
  deleteCartItems,
  getCartItems,
  getProducts,
  patchCartItems,
  postCartItems,
} from './api';

export const handlers = [
  getProducts,
  postCartItems,
  patchCartItems,
  getCartItems,
  deleteCartItems,
];
