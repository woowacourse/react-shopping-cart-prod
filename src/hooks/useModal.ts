import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCoupon } from '../recoil';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialState, setInitialState] = useState(false);
  const coupon = useRecoilValue(selectedCoupon);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setInitialState(true);
  };

  return { handleModalOpen, isModalOpen, setIsModalOpen, initialState, coupon };
};
