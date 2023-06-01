import { selector } from 'recoil';
import type { Profile } from '../../types/Profile';
import clientState from '../atoms/clientState';
import profileQuery from '../queries/profileQuery';
import userAuthorizationState from './userAuthorizationState';

const userProfileState = selector<Profile | null>({
  key: 'userProfileState',
  get: ({ get }) => {
    const client = get(clientState);
    const authorization = get(userAuthorizationState);
    if (authorization === null) return null;

    const profile = get(profileQuery({ client }));
    return { ...profile, username: authorization.username };
  },
});

export default userProfileState;
