import { CartProduct } from './product';

export interface Order {
  orderId: number;
  orderItems: CartProduct[];
}
