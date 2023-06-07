import type { Meta, StoryObj } from '@storybook/react';
import Error from './ErrorComponent';

const meta = {
  title: 'cart/Error',
  component: Error,
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '테스트 에러 메시지입니다!',
  },
};
