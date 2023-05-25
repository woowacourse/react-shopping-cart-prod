import { atom } from 'recoil';

import { Servers } from '@Types/index';

const serverState = atom<Servers>({
  key: 'serverState',
  default: '에단',
});

export default serverState;
