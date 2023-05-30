import { useCallback, useEffect } from 'react';

interface useModalParams {
  isOpen: boolean;
  closeModal: () => void;
}

const useModalExternal = ({ isOpen, closeModal }: useModalParams) => {
  const closeModalHandler = useCallback(() => {
    closeModal();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModalHandler();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
};

export default useModalExternal;
