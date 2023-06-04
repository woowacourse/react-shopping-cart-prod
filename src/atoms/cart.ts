import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';
import { couponsSelector, selectedCouponsState } from './coupons';
import { getDiscountPrice } from '../domain/discount';

export const cartSelector = selector({
  key: 'cart',
  get: async () => {
    const { data } = await fetchCart();

    return data;
  },
});

// TODO: 아래 두 selector, atom 중복됨
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

export const isSelectedCartId = selectorFamily({
  key: 'isSelectedCartIdSelector',
  get:
    (cartId: number) =>
    ({ get }) => {
      const selectedCartItems = get(selectedCartItemIdsState);
      return selectedCartItems.has(cartId);
    },
});

// TODO: 방어코드가 필요하지 않을까?
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

export const discountPrice = selector({
  key: 'discountPriceSelector',
  get: ({ get }) => {
    const cart = get(cartSelector);
    const { allCoupons, specificCoupons } = get(couponsSelector);
    const selectedCoupons = get(selectedCouponsState);
    const totalPrice = get(totalPriceSelector);

    let totalDiscountPrice = 0;

    if (allCoupons.some((coupon) => selectedCoupons.includes(coupon.id))) {
      const applyCoupon = allCoupons.find(
        (coupon) => coupon.id === selectedCoupons[0]
      );
      if (!applyCoupon) return totalDiscountPrice;

      totalDiscountPrice += getDiscountPrice(applyCoupon, totalPrice);
      return totalDiscountPrice;
    }

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
