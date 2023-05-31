import Modal from '../../@common/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalContentState, modalOpenState } from '../../../recoil/modalAtoms';

function ModalContainer() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
}

export default ModalContainer;
