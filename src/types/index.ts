import { HOSTS } from '../constants';

export interface Coupons {
  rateCoupon: RateCouponInfo[];
  fixedCoupon: FixedCouponInfo[];
}

export interface RateCouponInfo {
  id: number;
  name: string;
  discountRate: number;
  expiredDate: string;
  minOrderPrice: number;
}

export type FixedCouponInfo = Omit<RateCouponInfo, 'discountRate'> & {
  discountPrice: number;
};

export interface ProductInfo {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductInfoInOrder extends ProductInfo {
  quantity: number;
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
  totalOrderPrice: number;
  products: ProductInfoInOrder[];
}

export interface OrderDetailItemInfo extends OrderItemInfo {
  deliveryFee: number;
  usingCouponName: string;
  discountPrice: number;
  beforeDiscountPrice: number;
}

export interface ResponseResult<T> {
  result: T | undefined;
  statusCode: number;
  location?: string;
  errorCode?: number;
  errorMessage?: string;
}

export type Host = (typeof HOSTS)[number];
