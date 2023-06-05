import type { Meta, StoryObj } from '@storybook/react';
import CouponListModal from './CouponListModal';

const meta = {
  title: 'box/CouponListModal',
  component: CouponListModal,
  tags: ['autodocs'],
} satisfies Meta<typeof CouponListModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CouponListModalContent: Story = {
  args: {},
};
