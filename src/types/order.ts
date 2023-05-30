import { CartItem } from './product';

interface Order {
  id: number;
  price: number;
  orderDate: string;
  orders: CartItem[];
}

export type { Order };
