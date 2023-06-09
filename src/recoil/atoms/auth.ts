import { atom } from 'recoil';
import { DEFAULT_USER_NAME } from '../../constants/auth';
import type { UserName } from '../../types/user';

export const userState = atom<UserName>({
  key: 'userState',
  default: DEFAULT_USER_NAME,
});
