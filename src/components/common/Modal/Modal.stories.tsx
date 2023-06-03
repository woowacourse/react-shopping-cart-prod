import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import CouponList from '@components/cart/CouponList';
import Layout from '@components/layout/Layout';
import { MOCK_COUPON_LIST } from '@mocks/handlers';
import Button from '../Button';
import Modal from '.';

function ModalStory() {
  const [isOpen, setIsOpen] = useState(false);

  const onModalClose = () => {
    setIsOpen(false);
  };

  const onModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <Layout>
      <Container>
        <Button text="쿠폰 선택" onClick={onModalOpen} />
        {isOpen && (
          <Modal title="쿠폰함" onModalClose={onModalClose}>
            <CouponList
              selectedCoupon={null}
              onCouponSelect={() => {
                return;
              }}
              coupons={MOCK_COUPON_LIST}
            />
          </Modal>
        )}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const meta = {
  component: ModalStory,
  title: 'Modal',
} satisfies Meta<typeof ModalStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
