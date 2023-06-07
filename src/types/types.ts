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
  discountType: 'deduction' | 'percentage';
  discountRate: number;
  discountAmount: number;
  minimumPrice: number;
}

export interface IssuableCouponType extends CouponType {
  issuable: boolean;
}

export interface OrderType {
  id: number;
  orderProducts: {
    product: ProductType;
    quantity: number;
  }[];
  confirmState: boolean;
}

export interface OrderDetailType extends OrderType {
  originalPrice: number;
  discountPrice: number;
  coupon?: CouponType;
}

export type ServerURLType = (typeof servers)[keyof typeof servers];
