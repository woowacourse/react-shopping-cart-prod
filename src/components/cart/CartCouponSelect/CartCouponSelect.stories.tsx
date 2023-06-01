import type { Meta, StoryObj } from '@storybook/react';
import CartCouponSelect from '.';

const meta = {
  component: CartCouponSelect,
  title: 'CartCouponSelect',
} satisfies Meta<typeof CartCouponSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coupons: 3,
  },
};

export const Empty: Story = {
  args: {
    coupons: 0,
  },
};
