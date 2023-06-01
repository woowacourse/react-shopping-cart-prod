export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartProduct {
  id: string;
  quantity: number;
  product: Product;
}

export type CouponType = 'percent';
export interface Coupon {
  id: number;
  type: CouponType;
  amount: number;
  name: string;
}
