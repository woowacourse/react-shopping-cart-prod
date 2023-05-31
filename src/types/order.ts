import { CartItem } from './cart';
import { Product } from './product';

export interface Order {
  id: number;
  price: number;
  orderDate: Date;
  orders: OrderItem[];
}

export interface OrderPayload {
  cartItemIds: Array<CartItem['id']>;
  usePoint: number;
}

type OrderItem = Product | CartItem['quantity'];
