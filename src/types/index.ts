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

export interface CheckedStateType {
  [key: number]: boolean;
  all: boolean;
}

export interface OrderDetailsType {
  product: ProductType;
  quantity: number;
}

export interface UserOrdersType {
  orderDate: string;
  orderDetails: OrderDetailsType[];
  orderId: number;
  shippingFee: number;
  totalProductsPrice: number;
  usedPoint: number;
}

export interface RegisterOrderType {
  totalProductsPrice: number;
  shippingFee: number;
  usedPoint: number;
  order: OrderType[];
}

export interface OrderType {
  cartItemId: number;
  quantity: number;
}

export interface Point {
  usablePoint: number;
}

export interface Discount {
  freeShippingThreshold: number;
  pointPercentage: number;
  shippingFee: number;
}
