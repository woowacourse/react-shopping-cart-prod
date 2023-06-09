export interface PaymentPostBody {
  cartItemIds: number[];
  couponIds: number[];
  isDeliveryFree: boolean;
  totalPrice: number;
}
