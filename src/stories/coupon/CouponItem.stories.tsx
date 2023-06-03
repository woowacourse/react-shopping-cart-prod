import type { Meta, StoryObj } from '@storybook/react';
import CouponItem from '../../components/coupon/CouponItem';

const meta = {
  title: 'ShoppingCart/coupon/CouponItem',
  component: CouponItem,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RateCoupon: Story = {
  args: {
    orderPrice: 5000000,
    couponItemInfo: {
      id: 1,
      name: '가입 축하 5% 할인 쿠폰',
      discountRate: 5,
      expiredDate: '2023-05-05',
      minOrderPrice: 5000000,
    },
  },
};

export const DisabledRateCoupon: Story = {
  args: {
    orderPrice: 0,
    couponItemInfo: {
      id: 1,
      name: '가입 축하 5% 할인 쿠폰',
      discountRate: 5,
      expiredDate: '2023-05-05',
      minOrderPrice: 5000000,
    },
  },
};

export const FixedCoupon: Story = {
  args: {
    orderPrice: 5000000,
    couponItemInfo: {
      id: 3,
      name: '3000원 할인 쿠폰',
      discountPrice: 3000,
      expiredDate: '2023-05-05',
      minOrderPrice: 5000000,
    },
  },
};

export const DisabledFixedCoupon: Story = {
  args: {
    orderPrice: 0,
    couponItemInfo: {
      id: 3,
      name: '3000원 할인 쿠폰',
      discountPrice: 3000,
      expiredDate: '2023-05-05',
      minOrderPrice: 5000000,
    },
  },
};
