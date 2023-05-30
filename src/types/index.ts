export interface Cart {
  id: CartId;
  quantity: number;
  product: Product;
}

export interface Product {
  id: ProductId;
  price: number;
  name: string;
  imageUrl: string;
}

export type ProductInOrder = {
  [K in keyof Product as `product_${string & K}`]: Product[K];
};

export interface Order {
  orderId: number;
  orderedTime: string;
  products: ProductInOrder[];
  deliveryPrice: { price: number };
  coupons: Coupon[];
}

export interface Coupon {
  couponId: number;
  couponName: string;
}

export type CartId = number;
export type ProductId = number;

export type ServerName = '여우' | '루쿠' | '제이';
export type Server =
  | 'https://www.backfoxxx.shop'
  | 'https://www.woowacourse.shop'
  | 'https://www.woowacourse.store';
