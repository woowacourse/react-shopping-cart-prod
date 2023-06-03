import { selectorFamily } from 'recoil';
import type { Client } from '../../api';

type ProfileQueryParams = {
  client: Client;
};

const profileQuery = selectorFamily({
  key: 'profileQuery',
  get:
    ({ client }: ProfileQueryParams) =>
    () =>
      client.get('/profile'),
});

export default profileQuery;
