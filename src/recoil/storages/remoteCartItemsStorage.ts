import { atomFamily } from 'recoil';
import type { Client } from '../../api';
import RemoteCartItemsStorage from '../../storages/RemoteCartItemsStorage';

const remoteCartItemsStorage = atomFamily<RemoteCartItemsStorage, Client>({
  key: 'remoteCartItemsStorageState',
  default: (client) => new RemoteCartItemsStorage(client),
  dangerouslyAllowMutability: true,
});

export default remoteCartItemsStorage;
