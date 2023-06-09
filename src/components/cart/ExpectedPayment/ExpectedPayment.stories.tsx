import type { Meta, StoryObj } from '@storybook/react';
import ExpectedPayment from '.';

const meta = {
  component: ExpectedPayment,
  title: 'ExpectedPayment',
} satisfies Meta<typeof ExpectedPayment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItemsPrice: 30000,
    deliveryFee: 3000,
    discountPrice: 0,
  },
};

export const Discount: Story = {
  args: {
    totalItemsPrice: 30000,
    deliveryFee: 3000,
    discountPrice: 3000,
  },
};

export const Empty: Story = {
  args: {
    totalItemsPrice: 0,
    deliveryFee: 0,
    discountPrice: 0,
  },
};
