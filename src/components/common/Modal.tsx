import React from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './styles/Modal.styles';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
  position?: 'center' | 'bottom';
  width?: string;
  height?: string;
}

export default function Modal({
  children,
  isModalOpen = false,
  closeModal,
  position = 'center',
  width = '220px',
  height = '220px',
}: ModalProps) {
  return createPortal(
    <>
      {isModalOpen && (
        <>
          <Styled.ModalBackdrop
            onClick={() => {
              closeModal();
            }}
          ></Styled.ModalBackdrop>
          <Styled.Modal width={width} height={height} modalPosition={position}>
            {children}
          </Styled.Modal>
        </>
      )}
    </>,
    document.body
  );
}
