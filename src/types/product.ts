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
  userPoint: number;
  minUsagePoints: number;
}

export type OrderProduct = Omit<CartProduct, 'cartItemId'>;
export interface Order {
  orderId: number;
  orderDateTime: string;
  orderItems: OrderProduct[];
  totalPrice: number;
}
