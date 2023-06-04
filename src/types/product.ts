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

export type CouponType = 'percent' | 'amount';
export interface Coupon {
  id: number;
  type: CouponType;
  amount: number;
  name: string;
}

export interface Order {
  id: number;
  originalPrice: number;
  actualPrice: number;
  deliveryFee: number;
  cartItems: CartProduct[];
}
