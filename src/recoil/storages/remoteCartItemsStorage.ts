import { atomFamily } from 'recoil';
import type { Client } from '../../api';
import SyncCartItemsStorage from '../../storages/SyncCartItemsStorage';

const remoteCartItemsStorage = atomFamily<SyncCartItemsStorage, Client>({
  key: 'remoteCartItemsStorageState',
  default: (client) => new SyncCartItemsStorage(client),
  dangerouslyAllowMutability: true,
});

export default remoteCartItemsStorage;
