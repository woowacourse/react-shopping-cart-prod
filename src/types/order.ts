import { ProductItemData } from './product';

interface OrderCartItemsData {
  cartItemId: number;
  quantity: number;
}

interface OrderedItemData {
  quantity: number;
  product: ProductItemData;
}

interface OrderData {
  id: number;
  orderedItems: OrderedItemData[];
  orderedAt: Date;
  totalItemPrice: number;
  discountedTotalItemPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export type { OrderCartItemsData, OrderedItemData, OrderData };
