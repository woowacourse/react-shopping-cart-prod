import { useEffect } from 'react';
import useModal from './useModal';

const useCloseModalOnUnmount = () => {
  const { isModalOpen, closeModal } = useModal();

  useEffect(() => {
    if (isModalOpen) {
      closeModal();
    }
  }, []);
};

export default useCloseModalOnUnmount;
