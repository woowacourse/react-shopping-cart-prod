import { DefaultValue, atomFamily, selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import cartItemsQuery from '../queries/cartItemsQuery';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';

type RemoteCartItemsState = {
  cartItems: CartItemEntity[];
  isSynchronizing: boolean;
};

const remoteCartItemsState = atomFamily<RemoteCartItemsState, Client>({
  key: 'remoteCartItemsState',
  default: selectorFamily({
    key: 'remoteCartItemsState/default',
    get:
      (client) =>
      ({ get }) => {
        const response = get(cartItemsQuery({ client }));

        return {
          isSynchronizing: false,
          cartItems: response.acceptOrThrow(200).data,
        };
      },
  }),
  effects: (client) => [
    ({ setSelf, getPromise }) => {
      const willStorage = getPromise(remoteCartItemsStorage(client));

      willStorage.then((storage) => {
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
        });
      });
    },
  ],
});

export default remoteCartItemsState;
