import { ReactNode } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const setModalContent = useSetRecoilState(modalContentState);
  const openModal = (component: ReactNode) => {
    setModalOpen(true);
    setModalContent(component);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(<></>);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
