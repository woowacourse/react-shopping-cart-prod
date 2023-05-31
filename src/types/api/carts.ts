import { ProductItem } from './products';

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface Coupon {
  id: number;
  name: string;
}

export interface DeliveryPolicy {
  price: number;
  limit: number;
}

export interface PriceResult {
  cartItemsPrice: ItemPrice[];
  deliveryPrice: number;
  discountFromTotalPrice: number;
}

interface ItemPrice {
  cartItemId: number;
  originalPrice: number;
  discountPrice: number;
}
