import { atom } from 'recoil';
import { ServerKey } from '../../constants/server';

export const serverNameState = atom<ServerKey>({
  key: 'serverNameState',
  default: '푸우',
});
