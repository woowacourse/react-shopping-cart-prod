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

export interface OrderedProductItem {
  quantity: number;
  product: Product;
}

export interface OrderedProduct {
  orderId: number;
  orderDateTime: string;
  orderItems: OrderedProductItem[];
  totalPrice: number;
}

export interface OrderedDetails extends OrderedProduct {
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
}

export interface OrderedData {
  products: {
    productId: number;
    quantity: number;
  }[];
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}
