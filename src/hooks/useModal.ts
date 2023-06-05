import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { $ModalState } from 'src/recoil/atom';

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
