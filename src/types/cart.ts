import { Product } from './product';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
