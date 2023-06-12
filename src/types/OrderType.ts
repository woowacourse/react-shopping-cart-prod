export interface OrderType {
  id: number;
  totalItemsPrice: number;
  discountPrice: number;
  deliveryFee: number;
  orderItems: OrderItemType[];
}

export interface OrderItemType {
  orderItemId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
