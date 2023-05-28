import type { Product } from './Product';

export type CartItem = {
  quantity: number;
  product: Product;
  unselectedForOrder: boolean;
};
