import type { Meta, StoryObj } from '@storybook/react';
import OrderConfirmModal from './OrderConfirmModal';

const meta = {
  title: 'order/OrderConfirmModal',
  component: OrderConfirmModal,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUsingPoint: Story = {
  args: {
    selectedCartItemIds: new Set([1, 2, 3, 4]),
    usingPoint: 3000,
    totalPaymentPrice: 45000,
  },
};

export const WithNoUsingPoint: Story = {
  args: {
    selectedCartItemIds: new Set([1, 2, 3, 4]),
    usingPoint: 0,
    totalPaymentPrice: 45000,
  },
};
