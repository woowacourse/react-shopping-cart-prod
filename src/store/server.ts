import { atom } from 'recoil';

import { DEFAULT_API_BASE_URL } from '../constants/api';
import { CURRENT_SERVER_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getFromLocalStorage } from '../utils/localStorage';
import { saveToLocalStorage } from '../utils/localStorage';
import { removeFromLocalStorage } from '../utils/localStorage';

const currentServerState = atom<string>({
  key: 'currentServer',
  default: DEFAULT_API_BASE_URL,
  effects: [
    ({ setSelf, onSet }) => {
      setSelf(
        getFromLocalStorage<string>(CURRENT_SERVER_LOCAL_STORAGE_KEY) ?? DEFAULT_API_BASE_URL
      );

      onSet((newValue, _, isReset) => {
        isReset
          ? removeFromLocalStorage(CURRENT_SERVER_LOCAL_STORAGE_KEY)
          : saveToLocalStorage(CURRENT_SERVER_LOCAL_STORAGE_KEY, newValue);
      });
    },
  ],
});

export { currentServerState };
