import { CartProduct } from './product';

export type Order = {
  orderId: number;
  products: CartProduct[];
  totalPrice: number;
  usedPoint: number;
  deliveryFee: number;
  orderedAt: string;
};
