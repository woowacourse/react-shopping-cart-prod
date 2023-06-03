import { useRecoilValue } from "recoil";
import {
  modalContentState,
  modalOpenState,
  modalRepository,
} from "../app/recoil/modalAtoms";
import Modal from "../components/Modal";

function ModalContainer() {
  const isModalOpen = useRecoilValue(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);

  const { closeModal } = useRecoilValue(modalRepository);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
}

export default ModalContainer;
