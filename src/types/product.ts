export interface ProductType {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItemType {
  cartItemId: number;
  quantity: number;
  product: ProductType;
}

export interface ScheduledOrderType {
  cartItems: CartItemType[];
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}

export interface OrderType {
  orderId: number;
  orderDateTime: string;
  orderItems: CartItemType[];
  totalPrice: number;
}
