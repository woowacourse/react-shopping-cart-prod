export const coupons = {
  allCoupons: [
    {
      id: 1,
      ownerMemberId: 1,
      discountType: 'RATE',
      target: 'ALL',
      value: 30,
    },

    {
      id: 2,
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
      discountType: 'Rate',
      target: 'SPECIFIC',
      targetCartItemId: 1,
      value: 10,
    },
    {
      id: 4,
      ownerMemberId: 1,
      discountType: 'FIX',
      target: 'SPECIFIC',
      targetCartItemId: 2,
      value: 1000,
    },
  ],
};
