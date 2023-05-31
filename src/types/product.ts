export interface Product {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartProduct {
  cartItemId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  cartItems: CartProduct[];
}

export interface ScheduledOrder extends Cart {
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}

export interface Order {
  orderId: number;
  orderDateTime: string;
  orderItems: CartProduct[];
  totalPrice: number;
}
