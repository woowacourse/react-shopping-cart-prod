import { DEDUCTION, PERCENTAGE } from '../abstract/constants';
import { servers } from '../service/apiURL';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface CouponType {
  id: number;
  name: string;
  discount_type: DiscountAmount;
  discount_rate: number;
  discount_amount: number;
  minimum_price: number;
}

export type DiscountAmount = typeof PERCENTAGE | typeof DEDUCTION;

export interface IssuableCouponType extends CouponType {
  issuable: boolean;
}
export type ServerURLType = (typeof servers)[keyof typeof servers];
