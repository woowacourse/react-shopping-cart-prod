import type { Meta, StoryObj } from '@storybook/react';
import CouponEventItem from './CouponEventItem';

const meta = {
  title: 'box/CouponEventItem',
  component: CouponEventItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponEventItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CouponEventItemContent: Story = {
  args: {
    coupon: {
      issuable: true,
      id: 0,
      name: '썸머특집 20% 할인쿠폰',
      discountType: 'percentage',
      discountRate: 0.2,
      discountAmount: 0,
      minimumPrice: 30000,
    },
  },
};
