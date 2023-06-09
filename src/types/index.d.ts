declare module '*.png';

declare global {
  interface Array<T> {
    toSpliced: (start: number, deleteCount: number, ...items: T[]) => Array<T>;
  }
}

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

export interface CartType extends Array<CartItemType> {}

export type ServerNameType = 'RAON' | 'JOURNY' | 'ZUNY';

export interface ToastInfoType {
  show: boolean;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export interface CouponInfo {
  discountRate: number;
  expiredAt: string;
  id: number;
  isUsed: boolean;
  name: string;
}

export interface PurchasingCartItemType {
  productId: number;
  quantity: number;
}

export interface OrderInfo {
  orderId: number;
  items: { product: ProductType; quantity: number }[];
  orderedAt: string;
}

export interface OrderDetailInfo {
  orderId: number;
  coupon: { name: string; discountRate: number };
  items: { product: ProductType; quantity: number }[];
  totalPrice: number;
  discountedTotalPrice: number;
  couponDiscountPrice: number;
  deliveryPrice: number;
  orderedAt: string;
}
