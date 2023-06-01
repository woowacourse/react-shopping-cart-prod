import { selector } from 'recoil';
import authorizationState from '../atoms/authorizationState';
import serverState from '../atoms/serverState';

const userAuthorizationState = selector({
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
