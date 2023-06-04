import { selector } from 'recoil';
import userQuery from '../queries/userQuery';

const userState = selector({
  key: 'userState',
  get: ({ get }) => {
    return get(userQuery);
  },
});

export default userState;
