import { atomFamily } from 'recoil';
import type { Authorization } from '../../types/Authorization';
import type { Server } from '../../types/Server';

const authorizationState = atomFamily<Authorization | null, Server>({
  key: 'authorizationState',
  default: {
    username: 'a@a.com',
    password: '1234',
  },
});

export default authorizationState;
