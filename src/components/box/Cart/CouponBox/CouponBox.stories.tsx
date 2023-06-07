import type { Meta, StoryObj } from '@storybook/react';
import CouponBox from './CouponBox';

const meta = {
  title: 'box/CouponBox',
  component: CouponBox,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CouponBoxContent: Story = {
  args: {},
};
