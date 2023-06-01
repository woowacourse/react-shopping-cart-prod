import { DefaultValue, atomFamily, selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import cartItemsQuery from '../queries/cartItemsQuery';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';

type SyncStatusState = {
  cartItems: CartItemEntity[];
  isSynchronizing: boolean;
};

const remoteCartItemsState = atomFamily<SyncStatusState, Client>({
  key: 'remoteCartItemsState',
  default: selectorFamily({
    key: 'remoteCartItemsState/default',
    get:
      (client) =>
      ({ get }) => {
        return {
          isSynchronizing: false,
          cartItems: get(cartItemsQuery({ client })),
        };
      },
  }),
  effects: (client) => [
    ({ onSet, setSelf, getPromise }) => {
      const willStorage = getPromise(remoteCartItemsStorage(client));

      willStorage.then((storage) =>
        storage.onSync((info) => {
          setSelf((syncStatus) => {
            if (syncStatus instanceof DefaultValue) {
              if (info.isSynchronizing) return syncStatus;

              return { cartItems: info.cartItems, isSynchronizing: info.isSynchronizing };
            }

            return {
              cartItems: syncStatus.cartItems,
              ...info,
            };
          });
          console.log(info.isSynchronizing ? 'synchronizing ...' : 'synchronized');
        }),
      );
    },
  ],
});

export default remoteCartItemsState;
