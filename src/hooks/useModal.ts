import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialState, setInitialState] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setInitialState(true);
  };

  return { handleModalOpen, isModalOpen, setIsModalOpen, initialState };
};
