import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { ProfileEntity } from '../../api/rest/ShoppingCartRestAPI';

type ProfileQueryParams = {
  client: Client;
};

const profileQuery = selectorFamily<ProfileEntity, ProfileQueryParams>({
  key: 'profileQuery',
  get:
    ({ client }) =>
    () =>
      client
        .get('/profile')
        .acceptOrThrow(200)
        .then((response) => response.data),
});

export default profileQuery;
