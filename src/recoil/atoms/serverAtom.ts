import { atom } from 'recoil';
import { getServer } from '../../utils/localStorage';

export const APIAtom = atom({
  key: 'setverAtomKey',
  default: getServer(),
});
