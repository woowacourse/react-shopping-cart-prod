import { selector } from 'recoil';
import type { Authorization } from '../../types/Authorization';
import authorizationState from '../atoms/authorizationState';
import serverState from '../atoms/serverState';

const userAuthorizationState = selector<Authorization | null>({
  key: 'userAuthorizationState',
  get: ({ get }) => {
    const server = get(serverState);
    return get(authorizationState(server));
  },
  set: ({ get, set }, authorization) => {
    const server = get(serverState);
    set(authorizationState(server), authorization);
  },
});

export default userAuthorizationState;
