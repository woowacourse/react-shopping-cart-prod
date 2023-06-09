import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose, children }: PropsWithChildren<ModalProps>) => {
  return createPortal(
    <>
      <BackDrop onClick={onClose}></BackDrop>
      <Container>
        {children}
        <CloseButton onClick={onClose}>X</CloseButton>
      </Container>
    </>,
    document.getElementById('modal-root') as HTMLDivElement,
  );
};

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

const Container = styled.div`
  position: fixed;
  width: 768px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 32px 25px;

  border-radius: 16px;
  background: white;

  @media only screen and (max-width: 768px) {
    width: 94%;
    left: 0;
    right: 0;
    transform: translate(0, -50%);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 25px;

  background-color: transparent;
  color: #aaaaaa;
  font-size: 20px;
  font-weight: 700;

  cursor: pointer;
`;

export default Modal;
