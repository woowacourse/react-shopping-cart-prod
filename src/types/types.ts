export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ReceivedCartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface CartItem extends ReceivedCartItem {
  checked: boolean;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
  checked: true;
}

export interface NewOrderItem {
  cartItemId: number;
  productId: number;
  quantity: number;
}

export interface NewOrder {
  orderItems: NewOrderItem[];
  orderDiscounts: {
    couponIds: number[];
    point: number;
  };
}

export interface OrderItem {
  id: number;
  productName: string;
  productPrice: number;
  paymentPrice: number;
  createdAt: string;
  productQuantity: number;
  image: string;
}

export interface Order {
  orderId: number;
  orderItems: OrderItem[];
}

export interface Sign {
  id: string;
  password: string;
}

export interface User {
  id: string;
  password: string;
  name: string;
}

export interface Coupon {
  id: number;
  couponName: string;
  discountPercent: number;
  discountAmount: number;
  minAmount: number;
}

export interface PointHistory {
  orderId: number;
  earnedPoint: number;
  usedPoint: number;
}

export interface Point {
  pointHistories: PointHistory[];
  totalPoint: 0;
}
