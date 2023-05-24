import { atom } from 'recoil';

import { API_BASE_URL } from '../constants/api';

const currentServerState = atom<string>({
  key: 'currentServer',
  default: API_BASE_URL,
});

export { currentServerState };
