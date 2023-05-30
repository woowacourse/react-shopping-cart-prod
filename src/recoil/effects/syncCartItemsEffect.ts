import type { AtomEffect } from 'recoil';
import { DefaultValue } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import RemoteCartItemsStorage from '../../storages/RemoteCartItemsStorage';
import type { CartItem } from '../../types/CartItem';

/**
 * cartItems를 remote와 동기화하는 AtomEffect입니다.
 */
const syncCartItemsEffect = (client: Client): AtomEffect<(CartItem | CartItemEntity)[]> => {
  const remoteCartItemsStorage = new RemoteCartItemsStorage(client);

  return ({ onSet, setSelf }) => {
    remoteCartItemsStorage.onChangeByDownstream((updater) =>
      setSelf((cartItems) => {
        if (cartItems instanceof DefaultValue) return cartItems;

        return updater(cartItems);
      }),
    );

    onSet((newCartItems, oldCartItems, isReset) => {
      if (isReset) {
        remoteCartItemsStorage.reset();
        return;
      }
      if (oldCartItems instanceof DefaultValue) {
        remoteCartItemsStorage.initSet(newCartItems);
        return;
      }
      remoteCartItemsStorage.set(newCartItems);
    });

    return () => remoteCartItemsStorage.clear();
  };
};

export default syncCartItemsEffect;
