import { atom } from 'recoil';
import { SERVER_NAME, ServerName } from '@constants/serverUrlConstants';

const serverState = atom<ServerName>({
  key: 'serverState',
  default: SERVER_NAME[0],
});

export default serverState;
