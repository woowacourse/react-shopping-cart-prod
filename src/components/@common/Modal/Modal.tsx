import useModal from '../../../hooks/useModal.ts';
import * as Styled from './Modal.styles.tsx';

const Modal = () => {
  const { isModalOpened, modalContent, closeModal } = useModal();

  return (
    <Styled.ModalContainer isModalOpened={isModalOpened} onClick={closeModal}>
      <Styled.ModalContent onClick={(event) => event.stopPropagation()}>{modalContent}</Styled.ModalContent>
    </Styled.ModalContainer>
  );
};

export default Modal;
