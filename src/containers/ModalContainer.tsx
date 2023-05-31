import { useRecoilValue } from "recoil";
import {
  modalContentState,
  modalOpenState,
  modalRepository,
} from "../recoil/modalAtoms";
import Modal from "../components/Modal";

function ModalContainer() {
  const isModalOpen = useRecoilValue(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);

  const todoRepository = useRecoilValue(modalRepository);
  const { closeModal } = todoRepository;

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
}

export default ModalContainer;
