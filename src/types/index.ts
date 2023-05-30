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

export interface OrderItemInfo {
  id: number;
  orderNumber: number;
  date: string;
  products: ProductInfoInOrder[];
}

export interface ProductInfoInOrder extends ProductInfo {
  quantity: number;
}

export type Host = (typeof HOSTS)[number];
