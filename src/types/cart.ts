import { Product } from './product';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
}
