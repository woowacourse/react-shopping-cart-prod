import { Meta, StoryObj } from '@storybook/react';

import OrderProductList from '../components/Order/OrderProductList';

const meta = {
  title: 'Order/OrderProductList',
  component: OrderProductList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OrderProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  orderItems: [
    {
      quantity: 5,
      product: {
        productId: 1,
        price: 10000,
        name: '치킨',
        imageUrl: 'http://example.com/chicken.jpg',
      },
    },
    {
      quantity: 1,
      product: {
        productId: 2,
        price: 20000,
        name: '피자',
        imageUrl: 'http://example.com/pizza.jpg',
      },
    },
  ],
};

export const Default: Story = {
  args: {
    orderProducts: mockProduct.orderItems,
  },
};
