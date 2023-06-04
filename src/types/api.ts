export interface CouponAppliedPriceResponse {
  cartItemsPrice: CartItemsPrice[];
  deliveryPrice: DeliveryPrice;
  discountFromTotalPrice: DiscountFromTotalPrice;
}

export interface CartItemsPrice {
  cartItemId: number;
  originalPrice: number;
  discountPrice: number;
}

export interface DeliveryPrice {
  originalPrice: number;
  discountPrice: number;
}

export interface DiscountFromTotalPrice {
  discountPrice: number;
}

export interface PostPaymentRequest {
  cartItemIds: number[];
  isDeliveryFree: boolean;
  totalPaymentPrice: number;
  couponIds: number[];
}
