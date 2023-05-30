import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onCloseModal: () => void;
  onClickYes: () => void;
  onClickNo?: () => void;
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { isOpen, onCloseModal, onClickYes, message } = props;
  return createPortal(
    isOpen && (
      <>
        <S.BackDrop onClick={onCloseModal} />
        <S.Wrapper>
          <S.AlertTitle>{message}</S.AlertTitle>
          <S.ButtonWrapper>
            <S.Button onClick={onClickYes}>네</S.Button>
            <S.Button onClick={onCloseModal}>아니오</S.Button>
          </S.ButtonWrapper>
        </S.Wrapper>
      </>
    ),
    document.body
  );
};

export default Modal;
