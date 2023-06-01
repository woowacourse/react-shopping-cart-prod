import type { Meta, StoryObj } from '@storybook/react';
import OrderPaymentAmount from '.';

const meta = {
  component: OrderPaymentAmount,
  title: 'OrderPaymentAmount',
} satisfies Meta<typeof OrderPaymentAmount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItemsPrice: 30400,
    deliveryFee: 3000,
    discountPrice: 2000,
  },
};
