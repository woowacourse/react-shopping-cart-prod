import { Coupon, SpecificCoupon, AllCoupon } from './../types/coupon';
import { fetchCoupons } from './../apis/coupon';
import { atom, selector, selectorFamily } from 'recoil';
import { ProductCouponMap } from '../types/coupon';
import { CartItem } from '../types/cart';
import { ALL_COUPON_MAP_ID } from '../constants/coupon';

export const couponsSelector = selector({
  key: 'couponsSelector',
  get: async () => {
    const { allCoupons, specificCoupons } = await fetchCoupons();
    const productCoupons = specificCoupons.reduce<ProductCouponMap>(
      (productCoupons, coupon) => ({
        ...productCoupons,
        [coupon.targetProductId]: [
          ...(productCoupons[coupon.targetProductId] ?? []),
          coupon,
        ],
      }),

      Object.create(Object.prototype)
    );

    return { allCoupons, productCoupons };
  },
});

export const productCouponsSelector = selectorFamily({
  key: 'productCouponsSelector',
  get:
    (id: SpecificCoupon['targetProductId']) =>
    ({ get }) =>
      get(couponsSelector).productCoupons[id],
});

export const allCouponsSelector = selector({
  key: 'allCouponsSelector',
  get: ({ get }) => get(couponsSelector).allCoupons,
});

export type SelectedCouponsMap = Map<
  CartItem['id'],
  AllCoupon | SpecificCoupon
>;

export const selectedCouponsState = atom<SelectedCouponsMap>({
  key: 'selectedCouponsState',
  default: new Map(),
});

export const selectedCouponState = selectorFamily<
  SpecificCoupon | AllCoupon | null,
  CartItem['id']
>({
  key: 'selectedCouponState',
  get:
    (id) =>
    ({ get }) =>
      get(selectedCouponsState).get(id) ?? null,
});

export const selectedItemCouponIdList = selector({
  key: 'selectedItemCouponIdList',
  get: ({ get }) => {
    const selectedCoupons = get(selectedCouponsState);

    if (selectedCoupons.has(ALL_COUPON_MAP_ID))
      return [...selectedCoupons].map(([_, { id }]) => id);

    return [...selectedCoupons].reduce<Coupon['id'][]>(
      (arr, [cartId, { id }]) =>
        selectedCoupons.has(cartId) ? [...arr, id] : arr,
      []
    );
  },
});
