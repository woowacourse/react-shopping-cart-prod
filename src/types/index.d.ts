declare module '*.png';

export interface ToastInfoType {
  show: boolean;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export type ServerNameType = 'MSW' | '라온' | '져니' | '쥬니';

export interface LoginResponseType {
  token: string;
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

export interface CouponType {
  id: number;
  name: string;
  discountRate: number;
  expiredAt: string;
  isUsed: boolean;
}

export interface OrderItemType {
  product: ProductType;
  quantity: number;
}

export interface OrderType {
  orderId: number;
  orderedAt: string;
  items: OrderItemType[];
}

export interface OrderDetailType extends OrderType {
  coupon: Pick<CouponType, 'name' | 'discountRate'> | null;
  totalPrice: number;
  couponDiscountPrice: number;
  discountedTotalPrice: number;
  deliveryPrice: number;
}
