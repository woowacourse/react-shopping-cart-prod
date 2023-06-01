import { selector } from 'recoil';
import { Client } from '../../api';
import authorizationState from './authorizationState';
import serverState from './serverState';

const clientState = selector({
  key: 'clientState',
  get: ({ get }) => {
    const server = get(serverState);
    const authorization = get(authorizationState(server));

    const client = new Client({
      base: server.base,
      authorization,
    });

    return client;
  },
});

export default clientState;
