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
  orderId: 1,
  orderDateTime: '2023-05-24 08:30:21',
  orderItems: [
    {
      quantity: 5,
      product: {
        productId: 1,
        name: 'PET보틀-정사각(420ml)',
        price: 43400,
        imageUrl: 'images/정사각-420.jpeg',
      },
    },
    {
      quantity: 1,
      product: {
        productId: 3,
        name: 'PET보틀-정사각(370ml)',
        price: 41000,
        imageUrl: 'images/정사각-370.jpeg',
      },
    },
  ],
  totalPrice: 40500,
};

export const Default: Story = {
  args: {
    orderProducts: mockProduct,
  },
};
