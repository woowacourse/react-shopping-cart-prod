export const coupons = {
  allCoupons: [
    {
      id: 1,
      name: '주문금액 30% 할인 쿠폰',
      ownerMemberId: 1,
      discountType: 'RATE',
      target: 'ALL',
      value: 30,
    },

    {
      id: 2,
      name: '주문금액 3000원 할인 쿠폰',
      ownerMemberId: 1,
      discountType: 'FIX',
      target: 'ALL',
      value: 3000,
    },
  ],
  specificCoupons: [
    {
      id: 3,
      ownerMemberId: 1,
      name: '특정 상품 10% 할인',
      discountType: 'Rate',
      target: 'SPECIFIC',
      targetProductId: 1,
      value: 10,
    },
    {
      id: 4,
      ownerMemberId: 1,
      name: '특정 상품 1000원 할인',
      discountType: 'FIX',
      target: 'SPECIFIC',
      targetProductId: 2,
      value: 1000,
    },
  ],
};
