import { atom } from 'recoil';
import type { Server } from '../../config/servers';
import servers from '../../config/servers';

const serverState = atom<Server>({
  key: 'serverState',
  default: servers[0],
});

export default serverState;
