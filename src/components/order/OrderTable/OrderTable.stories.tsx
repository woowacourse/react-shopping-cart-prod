import type { Meta, StoryObj } from '@storybook/react';
import OrderTable from './OrderTable';
import { Order } from '../../../types/order';

const meta = {
  title: 'order/OrderTable',
  component: OrderTable,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const orderInfo: Order = {
  id: 123,
  price: 40000,
  orderDate: '2023-10-20T23:01:59',
  orders: [
    {
      id: 3942,
      quantity: 2,
      product: {
        id: 2543,
        name: '우코우 피자',
        price: 15000,
        imageUrl:
          'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      },
    },
    {
      id: 1029,
      quantity: 5,
      product: {
        id: 2543,
        name: '도우밥 만두',
        price: 3000,
        imageUrl:
          'https://cdn.pixabay.com/photo/2016/02/17/10/41/dumplings-1204814_1280.jpg',
      },
    },
  ],
};

export const Default: Story = {
  args: {
    orderInfo,
  },
};
