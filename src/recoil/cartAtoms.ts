import { atom, selector, selectorFamily } from "recoil";
import { CartItem, ProductItem, ReceivedCartItem } from "../types/types";
import {
  fetchAddCart,
  fetchCartList,
  fetchDeleteCart,
  fetchUpdateCart,
} from "../api/api.ts";
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

export const cartRepositoryState = selector({
  key: "cartRepositoryState",
  get: ({ get, getCallback }) => {
    const addCartItem = getCallback(({ set }) => async (productId: number) => {
      const server = get(serverState);
      await fetchAddCart(server, productId);
      const newCartList = await fetchCartList(server);
      set(cartState, newCartList);
    });

    const updateCartItemQuantity = getCallback(
      ({ set }) =>
        async (product: ProductItem, newQuantity: number) => {
          const server = get(serverState);
          const cartList = get(cartState);

          const targetCartItem = cartList.find(
            (cartItem) => cartItem.product.id === product.id
          );

          if (targetCartItem) {
            const cartId = targetCartItem.id;
            if (newQuantity === 0) {
              if (confirm("정말로 삭제 하시겠습니까?")) {
                await fetchDeleteCart(server, cartId);
              }
            } else {
              await fetchUpdateCart(server, cartId, newQuantity);
            }
            const newCartList = await fetchCartList(server);
            set(cartState, newCartList);
          }
        }
    );

    return { addCartItem, updateCartItemQuantity };
  },
});
