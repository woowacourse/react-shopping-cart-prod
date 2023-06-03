import type { Meta, StoryObj } from '@storybook/react';
import OrderCompleteInfo from '.';

const meta = {
  component: OrderCompleteInfo,
  title: 'OrderCompleteInfo',
} satisfies Meta<typeof OrderCompleteInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrderCompletePage: Story = {
  args: {
    userName: 'pizza1@pizza.com',
    orderItemsCount: 3,
    totalItemsPrice: 304000,
    deliveryFee: 3000,
    discountPrice: 2000,
  },
};
