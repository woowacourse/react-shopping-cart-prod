export interface OrderListType {
  id: number;
  totalItemsPrice: number;
  discountPrice: number;
  orderItems: OrderItemType[];
}

export interface OrderItemType {
  orderItemId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
