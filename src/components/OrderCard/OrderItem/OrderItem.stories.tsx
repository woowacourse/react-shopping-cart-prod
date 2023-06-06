import type { Meta, StoryObj } from '@storybook/react';
import OrderItem from './OrderItem';

const meta: Meta<typeof OrderItem> = {
  title: 'OrderItem',
  component: OrderItem,
};

export default meta;

type Story = StoryObj<typeof OrderItem>;

export const Default: Story = {
  args: {
    quantity: 3,
    name: 'SPRAYCAN TEE',
    price: 68000,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0099/5708/1143/products/1904905_WHIT_2_c8b4bbc9-8f9d-4cf3-a0e7-71dea5ea877e.jpg?v=1683635484',
  },
};
