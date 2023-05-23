export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface NewCartItem extends CartItem {
  quantity: 1;
}
