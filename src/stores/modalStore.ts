import { atom } from 'recoil';
import { ReactNode } from 'react';

type ModalStore = {
  isModalOpened: boolean;
  modalContent: ReactNode | null;
};

export const modalStore = atom<ModalStore>({
  key: 'modalStore',
  default: { isModalOpened: false, modalContent: null },
});
