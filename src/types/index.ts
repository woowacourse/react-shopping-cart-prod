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
  checked: boolean;
}

export interface CheckedCartItems {
  [key: number]: boolean;
  all: boolean;
}

export interface OrderPolicy {
  freeShippingThreshold: number;
  shippingFee: number;
  pointPercentage: number;
}

export interface OrderInfo {
  orderId: number;
  orderDate: string;
  orderDetails: OrderSummary[];
}

export interface OrderSummary {
  quantity: number;
  product: Product;
}

export interface OrderDetail {
  orderId: number;
  orderDate: string;
  totalProductsPrice: number;
  shippingFee: number;
  usedPoint: number;
  orderDetails: OrderSummary[];
}

export interface UsablePoint {
  useablePoint: number;
}

export interface ErrorResponse {
  payload: {
    errorMessage: string;
  };
}
