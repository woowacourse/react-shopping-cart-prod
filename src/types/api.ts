import { Coupon, Order } from './product';

export interface FetchCouponsResponse {
  coupons: Coupon[];
}

export interface FetchOrdersResponse {
  orders: Order[];
}
