import { getDiscountInfo } from './../utils/discount';
import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';
import { SpecificCoupon } from '../types/coupon';
import { Product } from '../types/products';

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
      (totalPrice, { id, quantity, product: { id: productId, price } }) => {
        let discountedPrice = price;
        const selectedCoupon = selectedCoupons.get(productId);

        if (selectedCoupon) {
          const { discountType, value } = selectedCoupon;

          discountedPrice = getDiscountInfo(price, {
            discountType,
            value,
          }).discountedPrice;
        }

        return selectedItems.has(id)
          ? totalPrice + quantity * discountedPrice
          : totalPrice;
      },
      0
    );
  },
});

export const selectedCouponsState = atom<Map<Product['id'], SpecificCoupon>>({
  key: 'selectedCouponsState',
  default: new Map(),
});

export const selectedCouponState = selectorFamily<
  SpecificCoupon | null,
  Product['id']
>({
  key: 'selectedCouponState',
  get:
    (id) =>
    ({ get }) =>
      get(selectedCouponsState).get(id) ?? null,
});
