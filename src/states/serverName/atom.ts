import { atom } from 'recoil';
import { SERVER_KEYS, ServerKey, isServerKey } from '../../constants/server';

export const serverNameState = atom<ServerKey>({
  key: 'serverNameState',
  default: isServerKey(SERVER_KEYS[0]) ? SERVER_KEYS[0] : '도치',
});
