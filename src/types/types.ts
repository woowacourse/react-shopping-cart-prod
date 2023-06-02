<<<<<<< HEAD
import { DEDUCTION, PERCENTAGE } from '../abstract/constants';
=======
>>>>>>> upstream/hafnium1923
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

<<<<<<< HEAD
export interface CouponType {
  id: number;
  name: string;
  discountType: DiscountAmount;
  discountRate: number;
  discountAmount: number;
  minimumPrice: number;
}

export interface IssuableCouponType extends CouponType {
  issuable: boolean;
}

export interface OrderProductsType {
  quantity: number;
  product: ProductType;
}
export interface OrderListType {
  id: number;
  orderProducts: OrderProductsType[];
  confirmState: boolean;
}

export interface OrderDetailType extends OrderListType {
  originalPrice: number;
  discountPrice: number;
  coupon: CouponType;
}
export type DiscountAmount = typeof PERCENTAGE | typeof DEDUCTION;

=======
>>>>>>> upstream/hafnium1923
export type ServerURLType = (typeof servers)[keyof typeof servers];
