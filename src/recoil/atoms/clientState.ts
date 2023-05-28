import { selector } from 'recoil';
import { Client } from '../../api';
import serverState from './serverState';

const clientState = selector({
  key: 'clientState',
  get: ({ get }) => {
    const server = get(serverState);
    const client = new Client({
      base: server.base,
    });

    return client;
  },
});

export default clientState;
