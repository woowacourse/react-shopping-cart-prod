import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_ORDER_LIST } from '@mocks/handlers';
import OrderItemList from '.';

const meta = {
  component: OrderItemList,
  title: 'OrderItemList',
} satisfies Meta<typeof OrderItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orders: MOCK_ORDER_LIST,
  },
};
