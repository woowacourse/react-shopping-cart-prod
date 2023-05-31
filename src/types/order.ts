import type { CartProduct } from './product';

export interface OrderInfo {
  cartItemIds: number[];
  totalPrice: number;
}

export interface Order {
  orderId: number;
  orderItems: CartProduct[];
}

export interface OrderDetail {
  order: Order;
  totalPrice: number;
}
