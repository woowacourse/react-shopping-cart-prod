import type { AtomEffect } from 'recoil';
import { DefaultValue } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../types/CartItem';
import CartItemRemoteState from '../remotes/CartItemRemoteState';

/**
 * remote로 부터 데이터를 받아 동기화하는 간격을 설정합니다. 단위: ms
 */
const SYNC_INTERVAL = 30_000;

/**
 * cartItems를 remote와 동기화하는 AtomEffect입니다.
 */
const syncCartItemsEffect = (client: Client): AtomEffect<(CartItem | CartItemEntity)[]> => {
  const remoteStates: Map<CartItem['product']['id'], CartItemRemoteState> = new Map();

  // remoteStates를 비웁니다.
  const clear = () => {
    [...remoteStates.values()].forEach((remoteState) => remoteState.clear());
    remoteStates.clear();
  };

  return ({ onSet, setSelf }) => {
    /**
     * remote로 부터 최신 상태를 받아와 client의 상태를 동기화합니다.
     */
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
