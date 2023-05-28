import type { OrderCartItem } from './OrderCartItem';

export type Order = {
  id: number;
  savingRate: number;
  points: number;
  cartItems: OrderCartItem[];
};
