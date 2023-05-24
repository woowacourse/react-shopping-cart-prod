import { atom } from 'recoil';

import { Servers } from '@Types/index';

const serverState = atom<Servers>({
  key: 'serverState',
  default: '도리와 노아',
});

export default serverState;
