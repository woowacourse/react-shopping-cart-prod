import { ProductItemData } from './product';

interface CartItemData {
  id: number;
  quantity: number;
  product: ProductItemData;
}

export type { CartItemData };
