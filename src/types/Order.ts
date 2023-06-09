import type { OrderCartItem } from './OrderCartItem';

export type Order = {
  id: number;
  savingRate: number;
  usedPoints: number;
  cartItems: OrderCartItem[];
};
