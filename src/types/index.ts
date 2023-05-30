export interface Cart {
  id: CartId;
  quantity: number;
  product: Product;
}

export interface Product {
  id: ProductId;
  price: number;
  name: string;
  imageUrl: string;
}

export type CartId = number;
export type ProductId = number;

export type ServerName = '여우' | '루쿠' | '제이';
export type Server =
  | 'https://www.backfoxxx.shop'
  | 'https://www.woowacourse.shop'
  | 'https://www.woowacourse.store';
