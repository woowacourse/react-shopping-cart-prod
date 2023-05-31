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
  minUsagePoint: number;
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

export interface OrderedData {
  cartItems: CartProduct[];
  totalProductPrice: number;
  totalDeliveryFee: number;
  usePoint: number;
  totalPrice: number;
}
