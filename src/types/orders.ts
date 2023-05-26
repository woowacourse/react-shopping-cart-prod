export interface Order {
  orderId: number;
  orderItems: OrderItem[];
  totalPrice: number;
}

export interface OrderItem {
  orderItemId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
