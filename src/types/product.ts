export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface PointsInfo {
  selectedPoints: number;
  maxPoints: number;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
}
