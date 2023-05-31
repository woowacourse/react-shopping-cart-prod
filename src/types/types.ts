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
  discountType: DiscountAmount;
  discountRate: number;
  discountAmount: number;
  minimumPrice: number;
}

export type DiscountAmount = typeof PERCENTAGE | typeof DEDUCTION;

export interface IssuableCouponType extends CouponType {
  issuable: boolean;
}
export type ServerURLType = (typeof servers)[keyof typeof servers];
