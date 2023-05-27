import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { MIN_QUANTITY } from "constants/cartProduct";
import { CartProduct } from "types/domain";
import { getCartItems } from "api/cartItems";
import { serverSelectState } from "./server";
import { couponListState } from "./coupon";

const getCartProductList = selector<CartProduct[]>({
  key: "getCartProductList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const cartItems = await getCartItems(selectedServer);

    return cartItems.map((item) => {
      const cartProduct: CartProduct = {
        ...item,
        isChecked: true,
        couponId: undefined,
      };

      return cartProduct;
    });
  },
});

export const cartListState = atom<CartProduct[]>({
  key: "cartList",
  default: getCartProductList,
});

export const cartSelector = selectorFamily<CartProduct | null, number>({
  key: "cartSelector",
  get:
    (productId) =>
    ({ get }) =>
      get(cartListState).find((item) => item.product.id === productId) ?? null,
  set:
    (productId) =>
    ({ get, set }, newProduct) => {
      if (newProduct instanceof DefaultValue) return;

      const cartList = [...get(cartListState)];
      const index = cartList.findIndex((item) => item.product.id === productId);

      if (!newProduct || newProduct.quantity <= MIN_QUANTITY) {
        index !== -1 && cartList.splice(index, 1);

        return set(cartListState, cartList);
      }

      if (index !== -1) cartList[index] = newProduct;
      if (index === -1) cartList.push(newProduct);

      return set(cartListState, cartList);
    },
});

export const cartTotalPrice = selector({
  key: "cartTotalPrice",
  get: ({ get }) => {
    return get(cartListState)
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },
});

export const cartTotalDiscount = selector({
  key: "cartTotalDiscount",
  get: ({ get }) => {
    const couponList = get(couponListState);

    return get(cartListState)
      .filter((item) => item.isChecked)
      .reduce((sum, item) => {
        const coupon = couponList.find(
          (coupon) => coupon.couponId === item.couponId
        )?.discount;

        if (!coupon) return sum;

        return coupon.type === "price"
          ? sum + coupon.amount
          : sum + item.product.price * item.quantity * (coupon.amount / 100);
      }, 0);
  },
});

export const cartCouponSelector = selectorFamily<number | undefined, number>({
  key: "cartCouponSelector",
  get: (productId) => {
    return ({ get }) => {
      const targetCart = get(cartListState).find(
        (item) => item.product.id === productId
      );
      return targetCart?.couponId ?? undefined;
    };
  },
  set:
    (productId) =>
    ({ get, set }, couponId) => {
      if (couponId instanceof DefaultValue) return;

      const cartList = [...get(cartListState)].map((item) => {
        if (item.product.id !== productId) return item;

        return { ...item, couponId: couponId };
      });

      return set(cartListState, cartList);
    },
});
