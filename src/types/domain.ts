import { CartItem } from "api/cartItems";
import { Coupon } from "api/coupons";

export interface CartProduct extends CartItem {
  isChecked: boolean;
}

export interface UsableCoupon extends Coupon {
  productId: number | null;
}
