import type { AtomEffect } from 'recoil';
import { DefaultValue } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../types/CartItem';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';

/**
 * cartItems를 remote와 동기화하는 AtomEffect입니다.
 */
const syncCartItemsEffect = (client: Client): AtomEffect<(CartItem | CartItemEntity)[]> => {
  return ({ onSet, setSelf, getPromise }) => {
    const willStorage = getPromise(remoteCartItemsStorage(client));

    willStorage.then((storage) => {
      storage.onChangeByDownstream((updater) =>
        setSelf((cartItems) => {
          if (cartItems instanceof DefaultValue) return cartItems;

          return updater(cartItems);
        }),
      );
    });

    onSet((newCartItems, oldCartItems, isReset) => {
      if (isReset) {
        willStorage.then((storage) => storage.reset());
        return;
      }
      if (oldCartItems instanceof DefaultValue) {
        willStorage.then((storage) => storage.initSet(newCartItems));
        return;
      }
      willStorage.then((storage) => storage.set(newCartItems));
    });

    return () => willStorage.then((storage) => storage.clear());
  };
};

export default syncCartItemsEffect;
