import styled from 'styled-components';

import ModalPortal from './ModalPortal';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <ModalPortal>
      <StyledDimmedModal
        onClick={e => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {children}
      </StyledDimmedModal>
    </ModalPortal>
  );
}

const StyledDimmedModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;
