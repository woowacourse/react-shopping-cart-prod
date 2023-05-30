import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { deleteModalState } from '../service/atom';
import { useBodyScrollLock } from './useBodyScrollLock';

type OpenModalType = {
  title?: string;
  callback?: () => void;
};

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(deleteModalState);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const closeModal = useCallback(() => {
    openScroll();
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState]);

  const openModal = useCallback(
    ({ title, callback }: OpenModalType) => {
      lockScroll();
      setModalDataState({
        title: title,
        isOpen: true,
        callBack: callback,
      });
    },
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
};
