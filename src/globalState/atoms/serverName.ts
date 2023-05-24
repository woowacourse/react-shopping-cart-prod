import { atom } from 'recoil';
import { ServerName } from '../../types/server';

const serverNameState = atom<ServerName>({
  key: 'serverNameState',
  default: '체인저',
});

export default serverNameState;
