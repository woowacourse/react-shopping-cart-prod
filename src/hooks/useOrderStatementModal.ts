import { useState } from "react";

export const useOrderStatementModal = <T>(list?: T[]) => {
  const [itemForModal, setItemForModal] = useState<T>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (target: T) => () => {
    setItemForModal(list?.find((item) => item === target));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { itemForModal, isModalOpen, openModal, closeModal } as const;
};
