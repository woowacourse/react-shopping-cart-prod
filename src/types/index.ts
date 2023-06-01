import { SVGProps } from 'react';
import { CSSProp } from 'styled-components';

export interface IconProps extends SVGProps<SVGSVGElement> {
  css?: CSSProp;
  pathFill?: string;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Cart extends Product {
  quantity: number;
}

export interface Order extends Omit<Cart, 'price'> {
  totalPrice: number;
}

export interface OrderList {
  orderId: number;
  products: Order[];
}

export interface OrderListItem extends Order {
  orderedProductCount: number;
}

export interface OrderItemDetail extends OrderList, Pick<Order, 'totalPrice'> {
  deliveryFee: number;
}
