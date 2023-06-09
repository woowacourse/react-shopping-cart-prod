import { atomFamily } from 'recoil';
import type { Authorization } from '../../types/Authorization';
import type { Server } from '../../types/Server';

const authorizationState = atomFamily<Authorization | null, Server>({
  key: 'authorizationState',
  default: null,
});

export default authorizationState;
