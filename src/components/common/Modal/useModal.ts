import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/atoms/common';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  } as const;
};
export default useModal;
