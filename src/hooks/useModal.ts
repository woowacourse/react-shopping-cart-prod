import { $ModalState } from 'src/recoil/atom';
import { useRecoilState } from 'recoil';
import { useMemo, useState } from 'react';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState($ModalState);
  const [localModalOpen, setLocalModalOpen] = useState(false);

  const closeModal = () => {
    setLocalModalOpen(false);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setLocalModalOpen(true);
    setIsModalOpen(true);
  };

  const modalOpen = useMemo(() => isModalOpen && localModalOpen, [isModalOpen, localModalOpen]);

  return { isModalOpen: modalOpen, openModal, closeModal };
}

export default useModal;
