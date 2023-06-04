import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import useModal from './hooks/useModal';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
`;

const meta = {
  component: Modal,
  title: 'Common/Modal',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],

  argTypes: {
    children: {
      description: '모달에 표시할 내용물 입니다.',
    },

    isOpen: {
      description: '모달의 열고 닫힘 상태입니다.',
    },

    closeModal: {
      description: '모달을 닫는 함수입니다.',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHooks = () => {
  const { isModalOpen, closeModal } = useModal(true);

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      여기에 모달의 컨텐츠가 표시됩니다
    </Modal>
  );
};

export const Default: Story = {
  render: () => <ModalWithHooks />,
};
