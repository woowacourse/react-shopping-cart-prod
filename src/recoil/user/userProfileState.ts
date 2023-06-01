import { selector } from 'recoil';
import type { ProfileEntity } from '../../api/rest/ShoppingCartRestAPI';
import clientState from '../atoms/clientState';
import profileQuery from '../queries/profileQuery';

const userProfileState = selector<ProfileEntity>({
  key: 'userProfileState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(profileQuery({ client }));
  },
});

export default userProfileState;
