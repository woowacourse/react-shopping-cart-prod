import type { Meta, StoryObj } from '@storybook/react';
import OrderHeader from '.';

const meta = {
  component: OrderHeader,
  title: 'OrderHeader',
} satisfies Meta<typeof OrderHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '주문 목록',
  },
};
