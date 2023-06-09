import type { Meta, StoryObj } from '@storybook/react';
import CartTotal from './CartTotal';

const meta = {
  title: 'cart/CartTotal',
  component: CartTotal,
  tags: ['autodocs'],
} satisfies Meta<typeof CartTotal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithShippingFee: Story = {
  args: {
    selectedCartItemIds: new Set([1, 2, 3, 4]),
    totalProductPrice: 10000,
  },
};

export const WithNoPrice: Story = {
  args: {
    selectedCartItemIds: new Set([1, 2, 3, 4]),
    totalProductPrice: 0,
  },
};

export const WithFreeShipping: Story = {
  args: {
    selectedCartItemIds: new Set([1, 2, 3, 4]),
    totalProductPrice: 30000,
  },
};
