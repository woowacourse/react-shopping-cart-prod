import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_COUPON_LIST } from '@mocks/handlers';
import CouponItem from './CouponItem';

const meta = {
  component: CouponItem,
  title: 'CouponItem',
} satisfies Meta<typeof CouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: MOCK_COUPON_LIST[0].name,
    discountValue: MOCK_COUPON_LIST[0].value,
    condition: 50000,
    type: 'percent',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    name: MOCK_COUPON_LIST[0].name,
    discountValue: 30000,
    type: 'price',
    condition: 50000,
    selected: true,
  },
};

export const Percent: Story = {
  args: {
    name: MOCK_COUPON_LIST[0].name,
    type: 'percent',
    discountValue: MOCK_COUPON_LIST[0].value,
    condition: 3000,
    selected: true,
  },
};

export const Delivery: Story = {
  args: {
    name: '웰컴 쿠폰',
    type: 'delivery',
    discountValue: 60000,
    condition: 0,
    selected: false,
  },
};

export const Special: Story = {
  args: {
    name: '웰컴 쿠폰',
    type: 'price',
    discountValue: 5000000,
    condition: 10,
    selected: false,
  },
};
