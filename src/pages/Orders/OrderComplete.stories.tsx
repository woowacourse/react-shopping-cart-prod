import type { Meta, StoryObj } from '@storybook/react';
import OrderComplete from './OrderComplete';

const meta = {
  component: OrderComplete,
  title: 'Pages',
} satisfies Meta<typeof OrderComplete>;

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
