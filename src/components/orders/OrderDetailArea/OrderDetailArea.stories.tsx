import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_ORDER_LIST } from '@mocks/handlers';
import OrderDetailArea from '.';

const meta = {
  component: OrderDetailArea,
  title: 'OrderDetailArea',
} satisfies Meta<typeof OrderDetailArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrderDetailPage: Story = {
  args: {
    orderId: MOCK_ORDER_LIST[0].id,
  },
};
