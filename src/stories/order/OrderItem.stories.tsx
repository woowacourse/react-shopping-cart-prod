import { Meta, StoryObj } from '@storybook/react';

import OrderItem from '../../components/Order/OrderItem';

const meta = {
  title: 'Order/OrderItem',
  component: OrderItem,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOrder = {
  orderId: 1,
  orderItems: [
    {
      id: 1,
      quantity: 3,
      product: {
        id: 1,
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        imageUrl: 'images/정사각-420.jpeg',
      },
    },
    {
      id: 2,
      quantity: 1,
      product: {
        id: 2,
        name: 'PET보틀-밀크티(370ml)',
        price: 73400,
        imageUrl: 'images/밀크티-370.jpeg',
      },
    },
  ],
};

export const Default: Story = {
  args: {
    order: mockOrder,
  },
};
