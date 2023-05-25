import { selector } from 'recoil';
import Client from '../../api/Client';
import type { ShoppingCartRestAPI } from '../../api/rest/ShoppingCartRestAPI';
import serverState from './serverState';

const clientState = selector({
  key: 'clientState',
  get: ({ get }) => {
    const server = get(serverState);
    const client = new Client<ShoppingCartRestAPI>({
      origin: server.origin,
    });

    return client;
  },
});

export default clientState;
