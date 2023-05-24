import { atom, selector, selectorFamily } from "recoil";
import {
  CartItem,
  ReceivedCartItem,
} from "../types/types";
import { fetchDeleteCart, fetchUpdateCart } from "../api/api.ts";
import { serverState } from "./serverAtom.ts";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const cartCountSelector = selector({
  key: "cartCountSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const checkedCartSelector = selector({
  key: "checkedCartSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  },
});

export const checkedCartCountSelector = selector({
  key: "checkedCartCountSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: "allCartCheckedSelector",
  get: ({ get }) => {
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
  get: ({ get }) => {
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
      ({ get }) => {
        const cartList = get(cartState);
        const targetCart = cartList.find((cart) => cart.product.id === productId);
        return targetCart?.quantity ?? 0;
      },
});

export const updateCartItemQuantitySelector = selectorFamily<number, number>({
  key: "updateCartItemQuantitySelector",
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set:
    (productId) =>
      ({ get, set }, newQuantity) => {
        const quantity = newQuantity as number;
        const server = get(serverState);
        const cartList = get(cartState);

        const targetCartItem = cartList.find(cartItem => cartItem.product.id === productId);
        if (targetCartItem) {
          const cartId = targetCartItem.id;

          if (quantity === 0) {
            if (confirm("정말로 삭제하시겠습니까?")) {
              const removedCartList = cartList.filter((cart) => cart.product.id !== productId);
              set(cartState, removedCartList);
              fetchDeleteCart(server, cartId);
            }
          } else {
            const cartList = get(cartState);
            const targetIndex = cartList.findIndex(
              (cartItem) => cartItem.product.id === productId
            );

            if (targetIndex !== -1) {
              const updatedCartList = [...cartList];
              updatedCartList[targetIndex] = {
                ...updatedCartList[targetIndex],
                quantity,
              };
              set(cartState, updatedCartList);


              fetchUpdateCart(server, cartId, newQuantity as number);
            }
          }
        }

      },
});

export const removeCartItemsSelector = selector<undefined>({
  key: "removeCartItemsSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = get(cartState);
    const checkedCartList = get(checkedCartSelector);
    const server = get(serverState);
    if (confirm("정말로 삭제하시겠습니까?")) {
      const targetIds = checkedCartList.map((cartList) => cartList.id);
      const removedCartList = cartList.filter(
        (cart) => !targetIds.includes(cart.id)
      );
      set(cartState, removedCartList);
      targetIds.forEach((id) => {
        fetchDeleteCart(server, id);
      });
    }
  },
});

export const switchCartCheckboxSelector = selector<number>({
  key: "switchCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: ({ get, set }, id) => {
    const cartList = [...get(cartState)];
    const targetIndex = cartList.findIndex(
      (cartItem) => cartItem.id === (id as number)
    );
    const targetCart = cartList[targetIndex];
    const updatedCart = {
      ...targetCart,
      checked: !targetCart.checked,
    };
    cartList[targetIndex] = updatedCart;
    set(cartState, cartList);
  },
});

export const switchAllCartCheckboxSelector = selector<undefined>({
  key: "switchAllCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = [...get(cartState)];
    const isAllCartItemChecked = get(allCartCheckedSelector);
    const newCartList = cartList.map((cartItem: ReceivedCartItem) => ({
      ...cartItem,
      checked: !isAllCartItemChecked,
    }));
    set(cartState, newCartList);
  },
});
