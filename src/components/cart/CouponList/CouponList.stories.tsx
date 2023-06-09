import type { Meta, StoryObj } from '@storybook/react';
import CouponList from '.';

const meta = {
  component: CouponList,
  title: 'CouponList',
} satisfies Meta<typeof CouponList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCoupon: null,
  },
};
