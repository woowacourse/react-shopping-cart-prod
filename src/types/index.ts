import { BOX_SIZE, FETCH_METHOD, SERVERS } from '@Constants/index';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: Product;
  isSelected: boolean;
};

export type fetchMethod = keyof typeof FETCH_METHOD;

export type UpdateCartItem = (url: string, method: fetchMethod, body?: BodyInit | null | undefined) => void;

export type FetchArgs = {
  url: string;
  method: fetchMethod;
  body?: BodyInit | null | undefined;
  server: Servers;
};

export type BoxSize = keyof typeof BOX_SIZE;

export type Servers = keyof typeof SERVERS;
