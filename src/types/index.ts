import { HOSTS } from '../constants';

export interface ProductInfo {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemInfo {
  id: number;
  quantity: number;
  product: ProductInfo;
}

export interface OrderProducts {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  totalPrice: number;
}

export interface OrderItemDetails extends OrderItem {
  orderTotalPrice: number;
  usedPoint: number;
  createdAt: string;
}

export type Host = (typeof HOSTS)[number];
