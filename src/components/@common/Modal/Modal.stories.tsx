import { Meta } from '@storybook/react';
import { useModal } from 'hooks/useModal';
import Modal from '.';

const modal = {
  component: Modal,
  title: 'Common/Modal',
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Modal>;

export default modal;

const Template = () => {
  const { closeModal } = useModal();
  return (
    <Modal
      isOpen={true}
      message="삭제하시겠습니까?"
      onCloseModal={closeModal}
      onClickYes={closeModal}
    />
  );
};

export const Default = Template.bind({});
