export interface AllCoupon {
  id: string;
  name: string;
  ownerMemberId: string;
  discountType: string;
  targetType: string;
  value: number;
}

export interface SpecificCoupon {
  id: string;
  name: string;
  ownerMemberId: string;
  discountType: 'RATE' | 'FIX';
  targetType: 'ALL' | 'SPECIFIC';
  targetProductId: string;
  value: number;
}

export type ProductCouponMap = Record<
  SpecificCoupon['targetProductId'],
  Omit<SpecificCoupon, 'targetProductId'>[]
>;
