import { ReactNode, useEffect, MouseEvent } from 'react';
import * as S from './Modal.style';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <S.ModalWrapper onClick={onClose}>
      <S.ModalContent onClick={handleModalContentClick}>{children}</S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
