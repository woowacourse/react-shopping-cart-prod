import { CartProduct } from './product';

export interface Order {
  orderId: number;
  orderItems: CartProduct[];
}

export interface OrderDetail {
  order: Order;
  totalPrice: number;
}
