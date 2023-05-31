import { atomFamily, selector } from 'recoil';
import type { Client } from '../../api';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';
import clientState from './clientState';

type SyncStatusState = {
  isSynchronizing: boolean;
};

const syncStatusState = atomFamily<SyncStatusState, Client>({
  key: 'syncHeartbeat',
  default: () => ({
    isSynchronizing: false,
  }),
});

const synchronizedCartItemsState = selector({
  key: 'synchronizedCartItemsState',
  get: ({ get, getCallback }) => {
    const client = get(clientState);
    const storage = get(remoteCartItemsStorage(client));

    const setSynchronizing = getCallback(({ set }) => (isSynchronizing: boolean) => {
      set(syncStatusState(client), { isSynchronizing });
    });

    storage.onSyncStart(() => {
      setSynchronizing(true);
      console.log('synchronizing ...');
    });

    storage.onSynchronized(() => {
      setSynchronizing(false);
      console.log('synchronized');
    });

    return get(syncStatusState(client));
  },
});

export default synchronizedCartItemsState;
