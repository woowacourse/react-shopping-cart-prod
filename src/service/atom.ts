import { atom } from 'recoil';
import { servers } from './apiURL';
import { ServerURLType } from '../types/types';

type ModalType = {
  title?: string;
  isOpen: boolean;
  callBack?: () => void;
};

export const checkCartListState = atom<number[]>({
  key: 'checkCartLists',
  default: [],
});

export const confirmModalState = atom<ModalType>({
  key: 'confirmModal',
  default: {
    isOpen: false,
  },
});

  default: {
    isOpen: false,
  },
});

export const serverState = atom<ServerURLType>({
  key: 'serverUrl',
  default: servers.달리,
});
