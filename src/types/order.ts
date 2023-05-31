import { CartItem } from './cart';
import { Product } from './product';

export interface Order {
  id: number;
  price: number;
  orderDate: Date;
  orders: OrderItem[];
}

type OrderItem = Product & CartItem['quantity'];
