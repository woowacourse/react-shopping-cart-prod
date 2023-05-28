import type { AtomEffect } from 'recoil';
import { DefaultValue } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../types/CartItem';
import CartItemRemoteState from '../remotes/CartItemRemoteState';

const SYNC_INTERVAL = 10_000;

const syncCartItemsEffect = (client: Client): AtomEffect<(CartItem | CartItemEntity)[]> => {
  const remoteStates: Map<CartItem['product']['id'], CartItemRemoteState> = new Map();
  const clear = () => {
    [...remoteStates.values()].forEach((remoteState) => remoteState.clear());
    remoteStates.clear();
  };

  return ({ onSet, setSelf }) => {
    const doDownstreamSync = async () => {
      const { data: cartItems } = await client.get('/cart-items').acceptOrThrow(200);

      setSelf(cartItems);
      [...remoteStates.values()].forEach((remoteState) =>
        remoteState.enqueueDownstreamSync(
          cartItems.find((cartItem) => cartItem.product.id === remoteState.productId) ?? null,
        ),
      );
    };

    onSet((newCartItems, rawOldCartItems, isReset) => {
      if (isReset) clear();

      const oldCartItems = rawOldCartItems instanceof DefaultValue ? [] : rawOldCartItems;

      newCartItems.forEach((cartItem) => {
        // 참조 동일성을 확인하여 업데이트가 필요한지 확인
        const shouldUpdate =
          oldCartItems.find((oldCartItem) => oldCartItem.product.id === cartItem.product.id) !==
          cartItem;

        if (!shouldUpdate) return;

        let remoteState = remoteStates.get(cartItem.product.id);
        if (!remoteState) {
          remoteState = new CartItemRemoteState(client, cartItem, cartItem.product.id);
          remoteState.onError(doDownstreamSync);
          remoteStates.set(cartItem.product.id, remoteState);
        }
        remoteState.set(cartItem);
      });

      if (isReset) return;

      const deletedCartItems = oldCartItems.filter(
        (cartItemEntity) =>
          newCartItems.find(
            (newCartItem) => newCartItem.product.id === cartItemEntity.product.id,
          ) === undefined,
      );

      deletedCartItems.forEach((cartItem) => {
        remoteStates.get(cartItem.product.id)?.set(null);
      });
    });

    const intervalHandler = setInterval(doDownstreamSync, SYNC_INTERVAL);

    return () => {
      clearInterval(intervalHandler);
      clear();
    };
  };
};

export default syncCartItemsEffect;
