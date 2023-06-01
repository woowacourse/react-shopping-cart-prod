import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';
import { couponsSelector, selectedCouponsState } from './coupons';
import { Coupon } from '../types/coupon';

export const cartSelector = selector({
  key: 'cart',
  get: async () => {
    const { data } = await fetchCart();

    return data;
  },
});

export const cartItemsAmountSelector = selector({
  key: 'cartItemsAmountSelector',
  get: ({ get }) => {
    return get(cartSelector).length;
  },
});

export const selectedCartItemIdsState = atom({
  key: 'selectedCartItemIdsState',
  default: selector({
    key: 'selectedCartItemIdsStateSelector',
    get: ({ get }) => {
      const cart = get(cartSelector);

      return cart.reduce<Set<CartItem['id']>>(
        (selectedItems, item) => selectedItems.add(item.id),
        new Set()
      );
    },
  }),
});

export const selectedCartItemIdsSelector = selector({
  key: 'selectedCartItemIdsSelector',
  get: ({ get }) => {
    const cart = get(cartSelector);
    const selectedItems = get(selectedCartItemIdsState);

    return cart.reduce<Set<CartItem['id']>>(
      (newSelectedItems, item) =>
        selectedItems.has(item.id)
          ? newSelectedItems.add(item.id)
          : newSelectedItems,
      new Set()
    );
  },
  set: ({ set }, newValue) => {
    set(selectedCartItemIdsState, newValue);
  },
});

export const selectedItemsAmountSelector = selector({
  key: 'selectedItemsAmountSelector',
  get: ({ get }) => get(selectedCartItemIdsSelector).size,
});

export const isSelectedCartId = selectorFamily({
  key: 'isSelectedCartIdSelector',
  get:
    (cartId: number) =>
    ({ get }) => {
      const selectedCartItems = get(selectedCartItemIdsState);
      return selectedCartItems.has(cartId);
    },
});

export const getCartItemById = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartSelector).find((item) => item.id === id);
    },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartSelector);
    const selectedItems = get(selectedCartItemIdsSelector);

    return cart.reduce(
      (totalPrice, { id, quantity, product: { price } }) =>
        selectedItems.has(id) ? totalPrice + quantity * price : totalPrice,
      0
    );
  },
});

const getDiscountPrice = (coupon: Coupon, targetPrice: number) => {
  const getDiscountPriceByRate = (base: number, rate: number) => {
    return Math.floor(base * (rate / 100));
  };

  if (coupon.discountType === 'RATE') {
    return getDiscountPriceByRate(targetPrice, coupon.value);
  }
  return coupon.value;
};

export const discountPrice = selector({
  key: 'discountPriceSelector',
  get: ({ get }) => {
    const cart = get(cartSelector);
    const { allCoupons, specificCoupons } = get(couponsSelector);
    const selectedCoupons = get(selectedCouponsState);
    const totalPrice = get(totalPriceSelector);

    let totalDiscountPrice = 0;
    // 전체 쿠폰일 시의 로직
    if (allCoupons.some((coupon) => selectedCoupons.includes(coupon.id))) {
      const applyCoupon = allCoupons.find(
        (coupon) => coupon.id === selectedCoupons[0]
      );
      if (!applyCoupon) return totalDiscountPrice;

      totalDiscountPrice += getDiscountPrice(applyCoupon, totalPrice);
      return totalDiscountPrice;
    }

    // 개별 주문시 할인 금액
    selectedCoupons.forEach((couponId) => {
      const applyCoupon = specificCoupons.find(
        (coupon) => coupon.id === couponId
      );

      if (!applyCoupon) return totalDiscountPrice;
      const applyCartItem = cart.find(
        (item) => item.product.id === applyCoupon.targetProductId
      );

      if (!applyCartItem) return totalDiscountPrice;

      totalDiscountPrice += getDiscountPrice(
        applyCoupon,
        applyCartItem.product.price * applyCartItem.quantity
      );
    });

    return totalDiscountPrice;
  },
});
