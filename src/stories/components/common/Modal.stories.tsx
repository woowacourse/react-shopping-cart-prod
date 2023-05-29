import { Meta } from '@storybook/react';
import ModalComponent from '../../../components/common/Modal';

const meta = {
  component: ModalComponent,
  title: 'Components/Modal',
  tags: ['autodocs'],
  args: {
    message: '에러가 발생했습니다!',
  },
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
      description: '에러 메시지를 변경할 수 있습니다.',
    },
  },
} satisfies Meta<typeof ModalComponent>;

export default meta;

export const Modal = (args: { message: string }) => {
  return <ModalComponent {...args} />;
};
