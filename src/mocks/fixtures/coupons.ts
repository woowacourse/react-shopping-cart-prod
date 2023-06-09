export const coupons = {
  allCoupons: [
    {
      id: 1,
      name: '주문금액 30% 할인 쿠폰',
      ownerMemberId: 1,
      discountType: 'RATE',
      targetType: 'ALL',
      value: 30,
    },

    {
      id: 2,
      name: '주문금액 3000원 할인 쿠폰',
      ownerMemberId: 1,
      discountType: 'FIX',
      targetType: 'ALL',
      value: 3000,
    },
  ],
  specificCoupons: [
    {
      id: 3,
      ownerMemberId: 1,
      name: '특정 상품 10% 할인',
      discountType: 'RATE',
      targetType: 'SPECIFIC',
      targetProductId: 1,
      value: 10,
    },
    {
      id: 4,
      ownerMemberId: 1,
      name: '특정 상품 1000원 할인',
      discountType: 'FIX',
      targetType: 'SPECIFIC',
      targetProductId: 2,
      value: 1000,
    },
  ],
};
