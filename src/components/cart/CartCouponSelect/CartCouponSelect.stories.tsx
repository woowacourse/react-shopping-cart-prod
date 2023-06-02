import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_COUPON_LIST } from '@mocks/handlers';
import CartCouponSelect from '.';

const meta = {
  component: CartCouponSelect,
  title: 'CartCouponSelect',
} satisfies Meta<typeof CartCouponSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableCouponLength: 3,
  },
};

export const Empty: Story = {
  args: {
    availableCouponLength: 0,
  },
};

export const Selected: Story = {
  args: {
    availableCouponLength: 3,
    selectedCoupon: MOCK_COUPON_LIST[0],
  },
};
