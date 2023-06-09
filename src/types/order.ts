import { CartItem } from './cart';
import { Product } from './product';

export interface Order {
  id: number;
  price: number;
  orderDate: string;
  orders: OrderItem[];
}

export interface OrderPayload {
  cartItemIds: Array<CartItem['id']>;
  usePoint: number;
}

export type OrderItem = {
  id: Product['id'];
  quantity: CartItem['quantity'];
  price: Product['price'];
  name: Product['name'];
  imageUrl: Product['imageUrl'];
};
