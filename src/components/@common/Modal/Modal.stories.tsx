import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import useModal from './hooks/useModal';

const meta = {
  component: Modal,
  title: 'Common/Modal',
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
