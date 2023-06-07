import type { Meta, StoryObj } from '@storybook/react';
import CouponItem from './CouponItem';

const meta = {
  title: 'box/CouponItem',
  component: CouponItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductContent: Story = {
  args: {
    isClicked: true,
    usable: true,
  },
};

export const ProductContent2: Story = {
  args: {
    isClicked: false,
    coupon: {
      id: 0,
      name: '썸머특집 20% 할인쿠폰',
      discountType: 'percentage',
      discountRate: 0.2,
      discountAmount: 0,
      minimumPrice: 30000,
    },
    usable: true,
  },
};
