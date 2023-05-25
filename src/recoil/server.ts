import { atom } from 'recoil';
import { SERVERS } from 'utils/constants';

export const serverAtom = atom({
  key: 'serverAtom',
  default: SERVERS['여우'],
});
