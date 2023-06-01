import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_ORDER_LIST } from '@mocks/handlers';
import OrderItem from './OrderItem';

const meta = {
  component: OrderItem,
  title: 'OrderItem',
} satisfies Meta<typeof OrderItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    order: MOCK_ORDER_LIST[0],
    isDetail: true,
  },
};
