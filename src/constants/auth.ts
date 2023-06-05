import type { UserName } from '../types/user';

export const DEFAULT_USER_NAME = '유스';
export const PAIR_USER_NAME = '요술토끼';

const userNameMapper = {
  유스: 'a@a.com',
  요술토끼: 'b@b.com',
} as const satisfies Record<UserName, string>;
const password = '1234';

export const getBase64 = (userName: UserName) => {
  return btoa(userNameMapper[userName] + ':' + password);
};
