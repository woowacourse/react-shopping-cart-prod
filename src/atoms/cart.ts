import { getDiscountInfo } from './../utils/discount';
import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';
import { selectedCouponsState } from './coupon';
import { ALL_COUPON_MAP_ID } from '../constants/coupon';

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
    const selectedCoupons = get(selectedCouponsState);

    return cart.reduce(
      (
        { originPrice, totalPrice },
        { id: cartId, quantity, product: { id: productId, price } }
      ) => {
        let discountedPrice = price;
        const allCoupon = selectedCoupons.get(ALL_COUPON_MAP_ID);
        const selectedCoupon = selectedCoupons.get(cartId);

        if (allCoupon) {
          const { discountType, value } = allCoupon;

          discountedPrice = getDiscountInfo(price, {
            discountType,
            value,
          }).discountedPrice;
        }

        if (selectedCoupon) {
          const { discountType, value } = selectedCoupon;

          discountedPrice = getDiscountInfo(price, {
            discountType,
            value,
          }).discountedPrice;
        }

        const updatedOriginPrice = selectedItems.has(cartId)
          ? originPrice + quantity * price
          : originPrice;

        const updatedTotalPrice = selectedItems.has(cartId)
          ? totalPrice + quantity * discountedPrice
          : totalPrice;

        return {
          originPrice: updatedOriginPrice,
          totalPrice: updatedTotalPrice,
          discountPrice: updatedOriginPrice - updatedTotalPrice,
        };
      },
      { originPrice: 0, totalPrice: 0, discountPrice: 0 }
    );
  },
});
