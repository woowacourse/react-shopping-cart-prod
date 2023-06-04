import { selector } from 'recoil';
import withCartTotalPrice from '@recoil/cart/selector/withCartTotalPrice';
import { getAvailableCouponsByTotalPrice } from '@utils/coupon/coupon';
import couponState from '../couponState';

const withAvailableCoupon = selector({
  key: 'availableCoupon',
  get: ({ get }) => {
    const coupons = get(couponState);
    const totalItemsPrice = get(withCartTotalPrice);

    return getAvailableCouponsByTotalPrice({
      coupons,
      totalItemsPrice,
    });
  },
});

export default withAvailableCoupon;
