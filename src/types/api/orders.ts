export interface OrderedItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  totalPrice: number;
  totalDiscountPrice: number;
}
export interface Order {
  id: number;
  orderedTime: string;
  orderedItems: OrderedItem[];
}

export interface OrderDetail extends Order {
  deliveryPrice: number;
  discountFromTotalPrice: number;
}
