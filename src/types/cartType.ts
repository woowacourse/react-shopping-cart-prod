import { ProductItemType, ServerProductItemType } from './productType';

export interface ServerCartItemType {
  id: number;
  quantity: number;
  product: ServerProductItemType;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
  isSelect: boolean;
}
