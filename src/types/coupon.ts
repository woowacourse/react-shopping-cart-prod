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
  discountType: string;
  targetType: string;
  targetProductId: string;
  value: number;
}
