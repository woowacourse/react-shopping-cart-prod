export interface Product {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}

export interface ScheduledOrder {
  cartItems: CartItem[];
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}

export interface Order {
  orderId: number;
  orderDateTime: string;
  orderItems: CartItem[];
  totalPrice: number;
}
