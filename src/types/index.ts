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

export interface OrderItem {
  orderId: number;
  orderProducts: CartItem[];
}

export type ToastType = 'success' | 'error';

export interface ToastItem {
  message: string;
  type: ToastType;
}
