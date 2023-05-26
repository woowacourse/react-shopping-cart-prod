import { DefaultValue, selectorFamily, useRecoilState } from 'recoil';
import cartState from './cartState';

import { fetchApi } from '@utils/createApiRequests';
import serverState, { SERVER } from '@recoil/server/serverState';
import { CART_PATH } from '@constants/urlConstants';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../constants/cartConstants';
import { productListState } from '@views/Product/recoil/productListState';

interface newType {
  cartId: number;
  quantity: number;
}

const withItemQuantityBy = selectorFamily<newType, number>({
  key: 'cartItemQuantityState',
  get:
    (productId) =>
    ({ get }) => {
      const cart = get(cartState);
      // TODO: 장바구니 리스트 가

      if (cart.length === 0) return { quantity: 0, cartId: 0 };

      const cartItem = cart.filter((cartItem) => {
        return cartItem.product.id === productId;
      })[0];

      if (!cartItem) {
        return {
          cartId: 0,
          quantity: 0,
        };
      }

      return { cartId: cartItem.id, quantity: cartItem.quantity };
    },
  set:
    (productId) =>
    ({ get, set }, newCart) => {
      if (newCart instanceof DefaultValue) {
        return;
      }

      const server = get(serverState);

      const cartList = get(cartState);

      const { cartId, quantity } = newCart;

      if (quantity < MAX_CART_QUANTITY && quantity >= MIN_CART_QUANTITY) {
        // Post
        if (!cartList.some((item) => item.id === cartId)) {
          if (quantity === 0) return;

          const product = get(productListState).filter((product) => product.id === productId)[0];

          set(cartState, (prevCartList) => [
            ...prevCartList,
            {
              id: cartId,
              quantity,
              checked: true,
              product,
            },
          ]);

          return;
        }

        //Delete
        if (quantity === 0) {
          set(cartState, (prevCartList) => prevCartList.filter((item) => item.id !== cartId));

          fetchApi(`${SERVER[server]}/${CART_PATH}/${cartId}`, {
            method: 'DELETE',
          });

          return;
        }

        // Patch
        set(cartState, (prevCartList) => {
          return prevCartList.map((item) => {
            if (item.id === cartId) {
              return {
                ...item,
                quantity,
              };
            } else {
              return item;
            }
          });
        });

        fetchApi(`${SERVER[server]}/${CART_PATH}/${cartId}`, {
          method: 'PATCH',
          body: JSON.stringify({ quantity }),
        });

        return;
      }
    },
});

export default withItemQuantityBy;

export const useCartItemQuantityBy = (productId: number) =>
  useRecoilState(withItemQuantityBy(productId));
