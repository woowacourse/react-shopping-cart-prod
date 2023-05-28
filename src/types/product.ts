export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartDetails {
  'cart-items': CartProduct[];
  userPoint: number;
  minUsagePoints: number;
}

export interface OrderProduct {
  quantity: number;
  product: {
    productId: number;
    price: number;
    name: string;
    imageUrl: string;
  };
}

export interface OrderDetails {
  orderId: number;
  orderDateTime: string;
  orderItems: OrderProduct[];
  totalPrice: number;
}
