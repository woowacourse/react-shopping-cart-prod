import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { keyframes, styled } from 'styled-components';
import useModal from './useModal';

const Modal = ({ children }: PropsWithChildren) => {
  const { closeModal } = useModal();

  const handleEscapeKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKeydown);

    return () =>
      document.body.removeEventListener('keydown', handleEscapeKeydown);
  }, []);

  return createPortal(
    <div role="dialog" aria-modal>
      <BackDrop onClick={closeModal} />
      <ModalContainer>{children}</ModalContainer>
    </div>,
    document.body,
  );
};

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: ${(props) => props.theme.zIndex.MODAL_BACKDROP};
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3D(-50%, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3D(-50%, -50%, 0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.color.WHITE};
  border-radius: 8px;
  z-index: ${(props) => props.theme.zIndex.MODAL_CONTAINER};
  animation: ${fadeInUp} 0.3s ease-in-out;
`;

export default Modal;
