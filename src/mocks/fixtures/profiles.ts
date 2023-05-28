import type { ProfileEntity } from '../../api/rest/ShoppingCartRestAPI';

const profiles: Record<string, ProfileEntity> = {
  'a@a.com:1234': {
    points: 1270,
  },
  'b@b.com:1234': {
    points: 10,
  },
};

export default profiles;
