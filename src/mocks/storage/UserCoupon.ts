import type { CouponInfo } from '../../types/coupon';
import mockCoupons from '../data/coupons.json';

const KEY = 'MSW_USER_COUPON_STEP2';

const getAll = (): { coupons: CouponInfo[] } => {
  const storageData = localStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : { coupons: [] };
};

const add = (couponId: number) => {
  const { coupons } = getAll();

  const userCouponIndex = coupons.findIndex(({ id }) => id === couponId);
  if (userCouponIndex > -1) return false;

  const mockCouponList: CouponInfo[] = mockCoupons.coupons;
  const couponInfo = mockCouponList.find(({ id }) => id === couponId);
  if (!couponInfo) return false;

  coupons.push(couponInfo);

  const sortedCoupons = coupons.sort((one, another) => one.id - another.id);

  localStorage.setItem(KEY, JSON.stringify({ coupons: sortedCoupons }));

  return true;
};

const use = (couponId: number) => {
  const { coupons } = getAll();

  const selectedCoupon = coupons.find(({ id }) => id === couponId);
  if (!selectedCoupon) return false;

  const newCoupons = coupons.filter((coupon) => coupon !== selectedCoupon);

  localStorage.setItem(KEY, JSON.stringify({ coupons: newCoupons }));

  return true;
};

const UserCoupon = { add, use, getAll };

export default UserCoupon;
