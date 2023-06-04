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
  createdAt: string;
  totalPayments: number;
  orderStatus: '결제완료' | '결제취소';
}

export interface OrderListItem extends Order, Pick<OrderList, 'totalPayments' | 'orderStatus'> {
  orderId?: number;
  orderedProductCount: number;
}

export interface OrderItemDetail extends OrderList, Pick<Order, 'totalPrice'> {
  deliveryFee: number;
  coupon: CouponState | null;
}

export interface CouponState {
  id: number;
  name: string;
  priceDiscount: number;
}
