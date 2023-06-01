import { ProductItemData } from './product';

interface OrderCartItemsData extends OrderCostsData {
  cartItemIds: number[];
}

interface OrderedItemData {
  quantity: number;
  product: ProductItemData;
}

interface OrderData extends OrderCostsData {
  id: number;
  orderedItems: OrderedItemData[];
  orderedAt: Date;
}

interface OrderCostsData {
  totalItemDiscountAmount: number;
  totalMemberDiscountAmount: number;
  totalItemPrice: number;
  discountedTotalItemPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export type { OrderCartItemsData, OrderedItemData, OrderData, OrderCostsData };
