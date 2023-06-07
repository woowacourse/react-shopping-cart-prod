export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface LocalProduct extends Product {
  quantity: number;
  cartItemId: number;
}

export interface Coupon {
  id: number;
  name: string;
  minOrderPrice: number;
  maxDiscountPrice: number;
  isAvailable: boolean;
  discountPrice: number | null;
  expiredAt: string;
}

export interface Order {
  couponId: number | null;
  products: Omit<LocalProduct, 'id'>[];
}

export interface OrderItemList {
  id: number;
  products: Omit<LocalProduct, 'cartItemId'>[];
}

export interface OrderDetail extends OrderItemList {
  discountPrice: number;
  shippingFee: number;
  totalProductPrice: number;
}
