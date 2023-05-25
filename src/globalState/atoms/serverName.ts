import { atom } from 'recoil';
import { ServerName } from '../../types/server';
import { DEFAULT_SERVER_NAME } from '../../constant';

const serverNameState = atom<ServerName>({
  key: 'serverNameState',
  default: DEFAULT_SERVER_NAME,
});

export default serverNameState;
