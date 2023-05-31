import { ProductItemData } from './product';

interface CartItemData {
  id: number;
  quantity: number;
  product: ProductItemData;
}

interface CartCostsData {
  totalItemDiscountAmount: number;
  totalMemberDiscountAmount: number;
  totalItemPrice: number;
  discountedTotalItemPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export type { CartItemData, CartCostsData };
