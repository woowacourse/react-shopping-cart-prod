import useModalExternal from '@common/hooks/useModalExternal';
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

function Modal({ isOpen, closeModal, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  useModalExternal({ isOpen, closeModal });

  return (
    <>
      {createPortal(
        <>
          <Background onClick={closeModal} />
          <ModalContainer>
            <CloseButton onClick={closeModal}>X</CloseButton>
            {children}
          </ModalContainer>
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 8px;
  background-color: #fff;
  padding: 2rem;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;
