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
