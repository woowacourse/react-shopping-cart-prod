import type { Meta, StoryObj } from '@storybook/react';
import OrderDetail from './OrderDetail';
import mockCart from '../../../mocks/data/cart.json';

const meta: Meta<typeof OrderDetail> = {
  title: 'OrderDetail',
  component: OrderDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 100,
    originalPrice: 10,
    actualPrice: 5,
    deliveryFee: 3000,
    showPayments: true,
    cartItems: mockCart,
  },
};
