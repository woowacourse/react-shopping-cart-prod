import { $ModalState } from 'src/recoil/atom';
import { useRecoilState } from 'recoil';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState($ModalState);

  const closeModal = () => {
    if (!setIsModalOpen) return;
    setIsModalOpen(false);
  };

  const openModal = () => {
    if (!setIsModalOpen) return;
    setIsModalOpen(true);
  };

  return { isModalOpen, openModal, closeModal };
}

export default useModal;
