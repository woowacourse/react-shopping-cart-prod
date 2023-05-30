import type { Meta, StoryObj } from '@storybook/react';
import OrderPaymentDetails from './OrderPaymentDetails';

const meta = {
  title: 'OrderPaymentDetails',
  component: OrderPaymentDetails,
} satisfies Meta<typeof OrderPaymentDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: 620,
    savingRate: 10,
    price: 12630,
  },
};
