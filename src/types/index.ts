export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface OrderProducts {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  totalPrice: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface OrderItem {
  orderId: number;
  orderProducts: OrderProducts[];
}

export interface OrderItemDetails extends OrderItem {
  orderTotalPrice: number;
  usedPoint: number;
  createdAt: string;
}

export interface MemberTypes {
  id: number;
  email: string;
  money: number;
  point: number;
}
