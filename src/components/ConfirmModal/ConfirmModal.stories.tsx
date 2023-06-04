import { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from './ConfirmModal';
import useModal from 'components/@common/Modal/hooks/useModal';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
`;

const meta = {
  component: ConfirmModal,
  title: 'ConfirmModal',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],

  argTypes: {
    children: {
      description: 'confirm할 내용입니다.',
    },

    isOpen: {
      description: '모달의 열고 닫힘 상태입니다.',
    },

    closeModal: {
      description: '모달을 닫는 함수입니다.',
    },

    onClickConfirmButton: {
      description: '확인 버튼 클릭 시 실행할 함수입니다.',
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

const ConfirmModalWithHooks = () => {
  const { isModalOpen, closeModal } = useModal(true);

  return (
    <ConfirmModal isOpen={isModalOpen} closeModal={closeModal} onClickConfirmButton={() => {}}>
      특정 행동을 하시겠습니까?
    </ConfirmModal>
  );
};

export const Default: Story = {
  render: () => <ConfirmModalWithHooks />,
};
