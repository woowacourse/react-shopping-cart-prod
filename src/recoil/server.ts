import { atom } from 'recoil';
import { SERVERS } from 'constants/index';

export const serverAtom = atom({
  key: 'serverAtom',
  default: SERVERS['여우'],
});
