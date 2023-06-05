import { selectedItemsState } from './cart';
import { Coupon, SpecificCoupon } from './../types/coupon';
import { fetchCoupons } from './../apis/coupon';
import { atom, selector, selectorFamily } from 'recoil';
import { ProductCouponMap } from '../types/coupon';
import { CartItem } from '../types/cart';

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

export const selectedCouponsState = atom<Map<CartItem['id'], SpecificCoupon>>({
  key: 'selectedCouponsState',
  default: new Map(),
});

export const selectedCouponState = selectorFamily<
  SpecificCoupon | null,
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
  get: ({ get }) =>
    [...get(selectedCouponsState)].reduce<Coupon['id'][]>(
      (arr, [cartId, { id }]) =>
        get(selectedItemsState).has(cartId) ? [...arr, id] : arr,
      []
    ),
});
