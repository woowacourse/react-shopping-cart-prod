import { SVGProps } from 'react';
import { CSSProp } from 'styled-components';
import { SERVER } from '../constants/url';

export type IconProps = SVGProps<SVGSVGElement> & {
  css?: CSSProp;
  pathFill?: string;
};

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
  isSelected: boolean;
};

export type ProductInOrder = Omit<Product, 'price'> & {
  quantity: number;
  totalPrice: number;
};

export type Order = {
  orderId: number;
  products: ProductInOrder[];
  totalPayments: number;
  createdAt: string;
  orderStatus: string;
};

export type OrderDetail = Omit<Order, 'createdAT' | 'orderStatus'> & {
  totalPrice: number;
  deliveryFee: number;
  coupon: Coupon;
};

export type Coupon = {
  id: number;
  name: string;
  priceDiscount: number;
};

export type ServerName = keyof typeof SERVER;

export type ServerUrl = (typeof SERVER)[ServerName];
