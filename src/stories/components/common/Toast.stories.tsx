import { Meta, StoryObj } from '@storybook/react';

import Toast from '../../../components/@common/Toast/Toast';

const meta = {
  title: 'Components/Common/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: 'Show toasts',
    type: 'success',
  },
  argTypes: {
    message: {
      description: '토스트에 나타날 메시지를 설정할 수 있습니다.',
    },
    type: {
      description: '토스트의 타입을 설정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
