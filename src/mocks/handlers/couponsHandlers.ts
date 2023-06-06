import { rest } from 'msw';
import { Coupon } from '../../types/domain';

const couponListMockData: Coupon[] = [
  {
    id: 1,
    name: '반짝할인(10%)',
    minOrderPrice: 10000,
    maxDiscountPrice: 5000,
    isAvailable: true,
    discountPrice: 3000,
    expiredAt: '2023-05-31T14:30:45.123',
  },
  {
    id: 3,
    name: '반짝할인(20%)',
    minOrderPrice: 20000,
    maxDiscountPrice: 5000,
    isAvailable: false,
    discountPrice: null,
    expiredAt: '2023-05-31T14:30:45',
  },
];

export const couponsHandler = [
  rest.get('react-shopping-cart-prod/api/coupon', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(couponListMockData));
  }),
];
