import { selector } from 'recoil';
import clientState from '../atoms/clientState';

const userQuery = selector({
  key: 'userQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/profile')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

export default userQuery;
