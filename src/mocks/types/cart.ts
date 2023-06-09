import type { CartItem } from '../../types/cart';

export interface NewCartItem extends CartItem {
  quantity: 1;
}
