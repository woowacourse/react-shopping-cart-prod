import { atom } from 'recoil';
import { getServerName } from '../../utils/localStorage';

export const APIAtom = atom({
  key: 'serverAtomKey',
  default: getServerName(),
});
