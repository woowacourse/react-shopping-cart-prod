import {selector, selectorFamily} from "recoil";
import {cartState} from "./cartAtoms.ts";

export const cartCountSelector = selector({
  key: "cartCountSelector",
  get: ({get}) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const checkedCartSelector = selector({
  key: "checkedCartSelector",
  get: ({get}) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  },
});

export const checkedCartCountSelector = selector({
  key: "checkedCartCountSelector",
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: "allCartCheckedSelector",
  get: ({get}) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every(
        (cartItem) => cartItem.checked
      );
      return isAllCartItemChecked;
    }

    return false;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
      0
    );
    return totalPrice;
  },
});

export const quantityByProductIdSelector = selectorFamily({
  key: "quantityByProductIdSelector",
  get:
    (productId: number) =>
      ({get}) => {
        const cartList = get(cartState);
        const targetCart = cartList.find((cart) => cart.product.id === productId);
        return targetCart?.quantity ?? 0;
      },
});

export const cartItemByProductIdSelector = selectorFamily({
  key: "cartItemByProductIdSelector",
  get:
    (productId: number) =>
      ({get}) => {
        const cartList = get(cartState);
        return cartList.find((cartItem) => cartItem.product.id === productId);
      },
});
