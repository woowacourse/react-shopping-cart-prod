export interface Coupon {
  id: number;
  name: string;
  ownerMemberId: number;
  discountType: 'RATE' | 'FIX';
  value: number;
}

export interface AllCoupon extends Coupon {
  targetType: 'ALL';
}

export interface SpecificCoupon extends Coupon {
  targetType: 'SPECIFIC';
  targetProductId: number;
}

export type ProductCouponMap = Record<
  SpecificCoupon['targetProductId'],
  SpecificCoupon[]
>;
