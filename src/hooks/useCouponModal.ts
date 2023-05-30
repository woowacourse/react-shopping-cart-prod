import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { couponModalState } from '../service/atom';
import { useBodyScrollLock } from './useBodyScrollLock';

type OpenModalType = {
  title?: string;
  callback?: () => void;
};

export const useCouponModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(couponModalState);
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
