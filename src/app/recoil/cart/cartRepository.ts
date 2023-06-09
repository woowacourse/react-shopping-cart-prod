import {selector} from "recoil";
import {serverState} from "../serverAtom.ts";
import {fetchAddCart, fetchCartList, fetchDeleteCart, fetchUpdateCart} from "../../api/api.ts";
import {CartItem, ProductItem} from "../../../types/types.ts";
import {allCartCheckedSelector, cartItemByProductIdSelector, checkedCartSelector} from "./cartSelectors.ts";
import {userState} from "../user/userAtom.tsx";
import {cartState} from "./cartAtoms.ts";

export const cartRepository = selector({
  key: "cartRepository",
  get: ({getCallback}) => {
    const addCartItem = getCallback(
      ({set, snapshot}) =>
        async (productId: number) => {
          const server = await snapshot.getPromise(serverState);
          await fetchAddCart(server, productId);
          const newCartList = await fetchCartList(server);
          set(cartState, newCartList);
        }
    );

    const updateCartItemQuantity = getCallback(
      ({set, snapshot}) =>
        async (product: ProductItem, newQuantity: number) => {
          const server = await snapshot.getPromise(serverState);
          const targetCartItem = await snapshot.getPromise(
            cartItemByProductIdSelector(product.id)
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

    const switchAllCheckboxes = getCallback(({snapshot, set}) => async () => {
      const cartList = await snapshot.getPromise(cartState);
      const isAllCartItemChecked = await snapshot.getPromise(
        allCartCheckedSelector
      );
      const newCartList = cartList.map((cartItem: CartItem) => ({
        ...cartItem,
        checked: !isAllCartItemChecked,
      }));
      set(cartState, newCartList);
    });

    const loadCartList = getCallback(({snapshot, set}) => async () => {
      const user = await snapshot.getPromise(userState);
      const server = await snapshot.getPromise(serverState);
      if (user) {
        const checkedCartItems = await fetchCartList(server);
        set(cartState, checkedCartItems);
      }
    });

    const removeCheckedCartItems = getCallback(
      ({snapshot, set}) =>
        async () => {
          if (confirm("정말로 삭제 하시겠습니까?")) {
            const server = await snapshot.getPromise(serverState);
            const checkedCartList = await snapshot.getPromise(
              checkedCartSelector
            );
            const targetIds = checkedCartList.map((cartList) => cartList.id);
            await Promise.all(
              targetIds.map((cartId) => fetchDeleteCart(server, cartId))
            );
            const newCartList = await fetchCartList(server);
            set(cartState, newCartList);
          }
        }
    );

    return {
      addCartItem,
      updateCartItemQuantity,
      switchAllCheckboxes,
      loadCartList,
      removeCheckedCartItems,
    };
  },
});
