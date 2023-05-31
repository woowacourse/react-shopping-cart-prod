export interface Coupon {
  id: number;
  name: string;
  ownerMemberId: number;
  discountType: 'RATE' | 'FIX';
  target: 'ALL' | 'SPECIFIC';
  value: number;
}

export interface SpecificCoupon extends Coupon {
  targetProductId: number;
}
