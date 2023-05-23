import { atom } from 'recoil';
import { client } from '../../api';
import type { Server } from '../../servers';
import servers from '../../servers';

const serverState = atom<Server>({
  key: 'serverState',
  default: servers[0],
  effects: [
    ({ onSet }) => {
      onSet((newServer) => {
        client.setBaseUrl(newServer.baseUrl);
      });
    },
  ],
});

export default serverState;
