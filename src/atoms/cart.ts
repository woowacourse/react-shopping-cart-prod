import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';
import { coupons, selectedCouponsState } from './coupons';

export const cartState = atom({
  key: 'cart',
  default: selector({
    key: 'getMockCart',
    get: async () => {
      const { data } = await fetchCart();

      return data;
    },
  }),
});

export const cartItemsAmountSelector = selector({
  key: 'cartItemsAmountSelector',
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export const selectedItemsState = atom({
  key: 'selectedItemsState',
  default: selector({
    key: 'selectedItemsStateSelector',
    get: ({ get }) => {
      const cart = get(cartState);

      return cart.reduce<Set<CartItem['id']>>(
        (selectedItems, item) => selectedItems.add(item.id),
        new Set()
      );
    },
  }),
});

export const selectedItemsSelector = selector({
  key: 'selectedItemsSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsState);

    return cart.reduce<Set<CartItem['id']>>(
      (newSelectedItems, item) =>
        selectedItems.has(item.id)
          ? newSelectedItems.add(item.id)
          : newSelectedItems,
      new Set()
    );
  },
  set: ({ set }, newValue) => {
    set(selectedItemsState, newValue);
  },
});

export const selectedItemsAmountSelector = selector({
  key: 'selectedItemsAmountSelector',
  get: ({ get }) => get(selectedItemsSelector).size,
});

export const getCartItemById = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsSelector);

    return cart.reduce(
      (totalPrice, { id, quantity, product: { price } }) =>
        selectedItems.has(id) ? totalPrice + quantity * price : totalPrice,
      0
    );
  },
});

const getDiscountPriceByRate = (base: number, rate: number) => {
  return Math.floor(base * (rate / 100));
};

export const discountPrice = selector({
  key: 'discountPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const couponsState = get(coupons);
    const selectedCoupons = get(selectedCouponsState);
    const totalPrice = get(totalPriceSelector);

    let totalDiscountPrice = 0;
    // 전체 쿠폰일 시의 로직
    if (
      couponsState.allCoupons.some((coupon) =>
        selectedCoupons.includes(coupon.id)
      )
    ) {
      const applyCoupon = couponsState.allCoupons.find(
        (value) => value.id === selectedCoupons[0]
      );
      if (!applyCoupon) return totalDiscountPrice;
      if (applyCoupon.discountType === 'RATE') {
        totalDiscountPrice += getDiscountPriceByRate(
          totalPrice,
          applyCoupon.value
        );
      } else {
        totalDiscountPrice += applyCoupon.value;
      }

      return totalDiscountPrice;
    }

    // 개별 주문시 할인 금액
    selectedCoupons.forEach((couponId) => {
      const applyCoupon = couponsState.specificCoupons.find(
        (value) => value.id === couponId
      );

      if (!applyCoupon) return totalDiscountPrice;
      const applyCartItem = cart.find(
        (item) => item.product.id === applyCoupon.targetProductId
      );

      if (!applyCartItem) return totalDiscountPrice;

      if (applyCoupon.discountType === 'RATE') {
        totalDiscountPrice += getDiscountPriceByRate(
          applyCartItem.product.price * applyCartItem.quantity,
          applyCoupon.value
        );
      } else {
        totalDiscountPrice += applyCoupon.value;
      }
    });

    return totalDiscountPrice;
  },
});
