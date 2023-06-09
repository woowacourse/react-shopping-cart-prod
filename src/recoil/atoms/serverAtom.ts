import { atom } from 'recoil';
import { getServerName } from '../../utils/localStorage';
import { SERVER_NAME } from '../../utils/localStorage';

interface EffectProps {
  setSelf: (param: any) => void;
  onSet: (
    param: (newValue: any, oldValue: any, isReset: boolean) => void
  ) => void;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: EffectProps) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const APIAtom = atom({
  key: 'serverAtomKey',
  default: getServerName(),
  effects: [localStorageEffect(SERVER_NAME), ({ setSelf, onSet }) => {}],
});
