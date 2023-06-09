import { calculateDiscountedPrice } from "./../utils/discount";
import { selector, atom, selectorFamily } from "recoil";
import { CartItem } from "../types/cart";
import { fetchCart } from "../apis/cart";
import { selectedCouponsState } from "./coupon";
import { ALL_COUPON_MAP_ID } from "../constants/coupon";

export const cartState = atom({
  key: "cart",
  default: selector({
    key: "getMockCart",
    get: async () => {
      const { data } = await fetchCart();

      return data.reverse();
    },
  }),
});

export const cartItemsAmountSelector = selector({
  key: "cartItemsAmountSelector",
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export const selectedItemsState = atom({
  key: "selectedItemsState",
  default: selector({
    key: "selectedItemsStateSelector",
    get: ({ get }) => {
      const cart = get(cartState);

      return cart.reduce<Set<CartItem["id"]>>((selectedItems, item) => selectedItems.add(item.id), new Set());
    },
  }),
});

export const selectedItemsSelector = selector({
  key: "selectedItemsSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsState);

    return cart.reduce<Set<CartItem["id"]>>(
      (newSelectedItems, item) =>
        selectedItems.has(item.id) ? newSelectedItems.add(item.id) : newSelectedItems,
      new Set()
    );
  },
  set: ({ set }, newValue) => {
    set(selectedItemsState, newValue);
  },
});

export const selectedItemsAmountSelector = selector({
  key: "selectedItemsAmountSelector",
  get: ({ get }) => get(selectedItemsSelector).size,
});

export const getCartItemById = selectorFamily({
  key: "hasItemInCart",
  get:
    (id: CartItem["id"]) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsSelector);
    const selectedCoupons = get(selectedCouponsState);

    return cart.reduce(
      (priceInfo, { id: cartId, quantity, product: { price } }) => {
        const { originPrice, totalPrice } = priceInfo;
        const allCoupon = selectedCoupons.get(ALL_COUPON_MAP_ID);
        const specificCoupon = selectedCoupons.get(cartId);
        const selected = selectedItems.has(cartId);
        const selectedCoupon = allCoupon || specificCoupon;
        const discountedPrice = selectedCoupon ? calculateDiscountedPrice(price, selectedCoupon) : price;

        if (!selected) return priceInfo;

        const updatedOriginPrice = originPrice + quantity * price;
        const updatedTotalPrice = totalPrice + quantity * discountedPrice;

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
