import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { confirmModalState } from '../service/atom';
import { useBodyScrollLock } from './useBodyScrollLock';

type OpenModalType = {
  callback?: () => void;
};

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(confirmModalState);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const closeModal = useCallback(() => {
    openScroll();
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState]);

  const openModal = useCallback(
    ({ callback }: OpenModalType) => {
      lockScroll();
      setModalDataState({
        isOpen: true,
        callBack: callback,
      });
    },
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
};
