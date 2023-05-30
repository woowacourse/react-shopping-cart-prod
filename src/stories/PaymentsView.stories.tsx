import PaymentsView from '../components/PaymentsView';
import type { PaymentsData } from '../types';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof PaymentsView>;
const meta: Meta<typeof PaymentsView> = {
  title: 'Common/PaymentsView',
  component: PaymentsView,
};
export default meta;

const mock: PaymentsData = {
  originalPrice: 50000,
  discounts: [
    {
      discountPolicy: '50000원 이상 구매 시 10%할인',
      discountAmount: 5000,
    },
  ],
  discountedPrice: 45000,
  deliveryFee: 3000,
  finalPrice: 48000,
};

export const Default: Story = {
  args: {
    paymentsData: mock,
  },
};
