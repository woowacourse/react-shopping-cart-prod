import { atom } from 'recoil';
import servers from '../../config/servers';
import type { Server } from '../../types/Server';

const serverState = atom<Server>({
  key: 'serverState',
  default: servers[0],
});

export default serverState;
