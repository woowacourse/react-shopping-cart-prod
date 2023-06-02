import { atom } from 'recoil';

import { Servers } from '@Types/index';

import { SERVERS } from '@Constants/servers';

const serverState = atom<Servers>({
  key: 'serverState',
  default: SERVERS['도리와 노아'].serverName,
});

export default serverState;
