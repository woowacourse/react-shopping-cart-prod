import { useRecoilState } from 'recoil';
import { modalStore } from '../stores/modalStore.ts';
import { ReactNode } from 'react';

const useModal = () => {
  const [{ isModalOpened, modalContent }, setModal] = useRecoilState(modalStore);

  const openModal = (content: ReactNode) => {
    setModal({ isModalOpened: true, modalContent: content });
  };

  const closeModal = () => {
    setModal({ isModalOpened: false, modalContent: null });
  };

  return { isModalOpened, modalContent, openModal, closeModal };
};

export default useModal;
