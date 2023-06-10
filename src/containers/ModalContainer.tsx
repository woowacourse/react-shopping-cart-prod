import {useRecoilValue} from "recoil";
import {
  modalContentState,
  modalOpenState,
} from "../app/recoil/modal/modalAtoms.tsx";
import Modal from "../components/Modal";
import {modalRepository} from "../app/recoil/modal/modalRepository.tsx";

function ModalContainer() {
  const isModalOpen = useRecoilValue(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);

  const {closeModal} = useRecoilValue(modalRepository);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
}

export default ModalContainer;
