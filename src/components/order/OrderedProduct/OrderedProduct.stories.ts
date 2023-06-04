import type { Meta, StoryObj } from '@storybook/react';
import OrderedProduct from './OrderedProduct';

const meta: Meta<typeof OrderedProduct> = {
  title: 'OrderedProduct',
  component: OrderedProduct,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '순살치킨 1KG',
    quantity: 5,
    price: 9900,
    imageUrl:
      'https://images.unsplash.com/photo-1626082929543-5bab0f090c42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
};
