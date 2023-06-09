import { SERVERS } from 'constants/index';

export interface Cart {
  id: CartId;
  quantity: number;
  product: Product;
}

export interface Product {
  id: ProductId;
  price: number;
  name: string;
  imageUrl: string;
  isOnSale: boolean;
  salePrice: number;
}

export interface OrderProduct extends Omit<Product, 'isOnSale' | 'salePrice'> {
  quantity: number;
  totalPrice: number;
  totalDiscountPrice: number;
}

export type CartId = number;
export type ProductId = number;

export type ServerName = keyof typeof SERVERS;

export interface Order {
  id: number;
  orderedTime: string;
  orderedItems: OrderProduct[];
}

export interface OrderDetailType extends Order {
  deliveryPrice: number;
  discountFromTotalPrice: number;
}

export interface CouponType {
  id: number;
  name: string;
}
