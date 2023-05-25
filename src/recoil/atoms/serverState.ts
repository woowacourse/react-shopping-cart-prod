import { atom } from 'recoil';
import type { Server } from '../../servers';
import servers from '../../servers';

const serverState = atom<Server>({
  key: 'serverState',
  default: servers[0],
});

export default serverState;
