import { selector, selectorFamily } from 'recoil';

import { cartProductState } from './atom';
import { findTargetProduct } from './util';

import { serverNameState } from '../serverName';
import cartProductApis from '../../apis/cartProducts';

export const cartProductSelector = selector({
  key: 'cartProductSelector',
  get: ({ get }) => {
    const serverName = get(serverNameState);
    return cartProductApis(serverName).getCartProducts();
  },
});

export const cartProductCountState = selector({
  key: 'cartProductCountState',
  get: ({ get }) => get(cartProductState).length,
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    ({ productId, cartItemId }: { productId: number; cartItemId?: number }) =>
    ({ get }) =>
      findTargetProduct(get(cartProductState), productId, cartItemId),
});

export const cartProductHandlerSelector = selector({
  key: 'cartProductHandlerSelector',
  get: ({ get, getCallback }) => {
    const serverName = get(serverNameState);
    const {
      getCartProducts,
      postCartProduct,
      patchCartProduct,
      deleteCartProduct,
    } = cartProductApis(serverName);

    const addCart = getCallback(({ set }) => async (id: number) => {
      const location = await postCartProduct(id);
      const newCartProducts = await getCartProducts();
      set(cartProductState, newCartProducts);

      return Number(location?.split('/').pop());
    });

    const updateTargetQuantity = getCallback(
      ({ set }) =>
        async (id: number, quantity: number) => {
          await patchCartProduct(id, quantity);
          const newCartProducts = await getCartProducts();
          set(cartProductState, newCartProducts);
        }
    );

    const deleteTargetCartProduct = getCallback(
      ({ set }) =>
        async (id: number) => {
          await deleteCartProduct(id);
          const newCartProducts = await getCartProducts();
          set(cartProductState, newCartProducts);
        }
    );

    return { addCart, updateTargetQuantity, deleteTargetCartProduct };
  },
});
