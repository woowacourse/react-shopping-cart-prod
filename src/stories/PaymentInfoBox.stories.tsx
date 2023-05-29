import { Meta, StoryObj } from '@storybook/react';

import PaymentInfoBox from '../components/Order/PaymentInfoBox';

const meta = {
  title: 'Order/PaymentInfoBox',
  component: PaymentInfoBox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PaymentInfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPrice: 1000,
  },
};
