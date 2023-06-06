import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { MIN_QUANTITY } from "constants/cartProduct";
import { CartProduct, OrderItem } from "types/domain";
import { getCartItems } from "api/cartItems";
import { serverSelectState } from "./server";
import { couponListState } from "./coupon";
import { calculateDiscountPrice } from "utile/calculateDiscountPrice";

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
        );

        if (!coupon) return sum + item.product.price * item.quantity;

        return (
          sum +
          calculateDiscountPrice(item.product.price, item.quantity, coupon)
        );
      }, 0);
  },
});

export const orderCartList = selector<OrderItem[]>({
  key: "orderCartList",
  get: ({ get }) => {
    return get(cartListState)
      .filter((item) => item.isChecked)
      .map((item) => {
        const { id, product, quantity, couponId } = item;

        const coupon =
          couponId &&
          get(couponListState).find((coupon) => coupon.couponId === couponId);

        return { id, product, quantity, coupons: coupon ? [coupon] : [] };
      });
  },
});
