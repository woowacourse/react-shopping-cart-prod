import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_ORDER_LIST } from '@mocks/handlers';
import OrderDetail from './OrderDetail';

const meta = {
  component: OrderDetail,
  title: 'Pages',
} satisfies Meta<typeof OrderDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrderDetailPage: Story = {
  args: {
    order: MOCK_ORDER_LIST[0],
  },
};
