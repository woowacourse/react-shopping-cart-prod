import type { Meta, StoryObj } from '@storybook/react';
import CouponList from '../../components/coupon/CouponList';

const meta = {
  title: 'ShoppingCart/coupon/CouponList',
  component: CouponList,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defatul: Story = {
  args: {
    totalProductsPrice: 5000000,
    rateCoupons: [
      {
        id: 1,
        name: '가입 축하 5% 할인 쿠폰',
        discountRate: 5,
        expiredDate: '2023-05-05',
        minOrderPrice: 5000000,
      },
      {
        id: 2,
        name: '10% 할인 쿠폰',
        discountRate: 10,
        expiredDate: '2023-05-05',
        minOrderPrice: 6000000,
      },
    ],
    fixedCoupons: [
      {
        id: 3,
        name: '3000원 할인 쿠폰',
        discountPrice: 3000,
        expiredDate: '2023-05-05',
        minOrderPrice: 6000000,
      },
      {
        id: 4,
        name: '10000원 할인 쿠폰',
        discountPrice: 10000,
        expiredDate: '2023-05-05',
        minOrderPrice: 5000000,
      },
    ],
  },
};
