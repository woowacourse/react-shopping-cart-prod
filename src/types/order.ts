interface Order {
  id: number;
  price: number;
  orderDate: string;
  orders: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

export type { Order };
