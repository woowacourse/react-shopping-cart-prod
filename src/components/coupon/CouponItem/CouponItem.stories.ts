import { Meta, StoryObj } from '@storybook/react';

import CouponItem from './CouponItem';

const meta: Meta<typeof CouponItem> = {
  title: 'CouponItem',
  component: CouponItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CouponItem>;

export const Default: Story = {
  args: {
    id: 1,
    name: '신규 가입 환영 쿠폰',
    type: 'percent',
    amount: 10,
  },
};
