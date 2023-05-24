import { servers } from '../service/apiURL';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export type ServerURLType = (typeof servers)[keyof typeof servers];
