import { selector } from 'recoil';
import { userState } from '../atoms/auth';
import { getBase64 } from '../../constants/auth';

export const base64 = selector({
  key: 'authState',
  get: ({ get }) => getBase64(get(userState)),
});
