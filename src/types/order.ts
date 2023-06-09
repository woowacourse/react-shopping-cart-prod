import type { CartProduct } from './product';

export interface OrderInfo {
  id: number;
  originalPrice: number;
  actualPrice: number;
  deliveryFee: number;
  cartItems: CartProduct[];
}
