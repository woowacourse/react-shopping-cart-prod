import {
  deleteCartItems,
  getCartItems,
  getCoupons,
  getOrderDetail,
  getOrderList,
  getProducts,
  patchCartItems,
  postCartItems,
  postOrder,
} from './api';

export const handlers = [
  getProducts,
  postCartItems,
  patchCartItems,
  getCartItems,
  deleteCartItems,
  postOrder,
  getOrderList,
  getOrderDetail,
  getCoupons,
];
