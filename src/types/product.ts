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

export interface CartDetails {
  cartItems: CartProduct[];
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

export interface OrderData {
  products: {
    productId: number;
    quantity: number;
  }[];
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}
