import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Modal from '@Components/Modal';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import CouponList from '../CouponList';

const UseCoupon = () => {
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  if (cartAmount === '0') return <></>;

  return (
    <Container>
      <AmountWrapper aria-label="할인 쿠폰">
        <AmountCategory>할인 쿠폰</AmountCategory>
        <AddButton onClick={openModal}>추가 {'>'}</AddButton>
      </AmountWrapper>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CouponList onClose={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;

  height: 73px;
  min-width: 360px;
  margin-bottom: 15px;

  border: 1px solid #dddddd;
  color: ${(props) => props.theme.color.gray100};
  background-color: white;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
`;

export const AmountCategory = styled.div`
  margin-left: 30px;
`;

export const AddButton = styled.button`
  margin-right: 25px;

  font-size: 18px;
  line-height: 20px;
  background-color: transparent;
  color: #888888;
  cursor: pointer;
`;

export default UseCoupon;
