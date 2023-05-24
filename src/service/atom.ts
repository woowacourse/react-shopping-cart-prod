import { atom } from 'recoil';
import { serverURLType, servers } from './apiURL';

type ModalType = {
  title?: string;
  isOpen: boolean;
  callBack?: () => void;
};

export const checkCartListState = atom<number[]>({
  key: 'checkCartLists',
  default: [],
});

export const deleteModalState = atom<ModalType>({
  key: 'deleteModal',
  default: {
    isOpen: false,
  },
});

export const serverState = atom<serverURLType>({
  key: 'serverUrl',
  default: servers.달리,
});
