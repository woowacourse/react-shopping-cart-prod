export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ReceivedCartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface CartItem extends ReceivedCartItem {
  checked: boolean;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
  checked: true;
}

export interface NewOrderItem {
  cartItemId: number;
  quantity: number;
  productId: number;
}

export interface NewOrder {
  orders: NewOrderItem[];
  couponId: number | null;
  point: number;
}

export interface OrderItem {
  id: number;
  productName: string;
  productPrice: number;
  paymentPrice: number;
  createdAt: string;
  productQuantity: number;
  image: string;
}

export interface Order {
  orderId: number;
  orderItems: OrderItem[];
}
