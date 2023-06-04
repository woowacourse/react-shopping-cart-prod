export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface OrderProducts {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderItem {
  orderId: number;
  orderProducts: OrderProducts[];
  orderTotalPrice: number;
  usedPoint: number;
  createdAt: string;
}

export type ToastType = 'success' | 'error';

export interface ToastItem {
  message: string;
  type: ToastType;
}

export interface MemberInfo {
  id: number;
  email: string;
  money: number;
  point: number;
}
