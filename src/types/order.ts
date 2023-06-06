import type { ProductItemData } from './product';

interface OrderCartItemsData extends OrderCostsData {
  cartItemIds: number[];
}

interface OrderedItemData extends ProductItemData {
  quantity: number;
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
