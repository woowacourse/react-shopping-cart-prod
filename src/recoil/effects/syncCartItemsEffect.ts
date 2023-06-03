import type { AtomEffect } from 'recoil';
import { DefaultValue } from 'recoil';
import type { Client } from '../../api';
import type { CartItem } from '../../types/CartItem';
import cartItemsQuery from '../queries/cartItemsQuery';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';

/**
 * cartItems를 remote와 동기화하는 AtomEffect입니다.
 */
const syncCartItemsEffect = (client: Client): AtomEffect<CartItem[]> => {
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

    getPromise(cartItemsQuery({ client })).then((response) => {
      const cartItems = response.acceptOrThrow(200).data;
      willStorage.then((storage) => {
        storage.setFromRemote(cartItems);
      });
    });

    onSet((newCartItems, oldCartItems, isReset) => {
      if (isReset) {
        willStorage.then((storage) => storage.reset());
        return;
      }
      willStorage.then((storage) => storage.setFromClient(newCartItems));
    });

    return () => willStorage.then((storage) => storage.clear());
  };
};

export default syncCartItemsEffect;
