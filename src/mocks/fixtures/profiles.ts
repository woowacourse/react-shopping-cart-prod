import type { ProfileEntity } from '../../api/rest/ShoppingCartRestAPI';

const profiles: Record<string, ProfileEntity> = {
  'a@a.com:1234': {
    currentPoints: 1270,
  },
  'b@b.com:1234': {
    currentPoints: 10,
  },
};

export default profiles;
