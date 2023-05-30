import type { Meta, StoryObj } from '@storybook/react';

import Coupon from '.';

/**
 * `Coupon`은 상품 할인관 관련된 재화를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof Coupon> = {
  title: 'Coupon',
  component: Coupon,
};

export default meta;

type Story = StoryObj<typeof Coupon>;

export const DefaultCoupon: Story = {};
