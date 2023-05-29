import { Meta, StoryObj } from '@storybook/react';
import Coupon from '.';

const coupon = {
  component: Coupon,
  title: 'Cart/Coupon',
  tags: ['autodocs'],
} satisfies Meta<typeof Coupon>;

export default coupon;

type Story = StoryObj<typeof coupon>;

export const Default: Story = {};
