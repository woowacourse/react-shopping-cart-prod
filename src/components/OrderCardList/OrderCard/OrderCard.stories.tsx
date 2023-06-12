import { Meta, StoryObj } from '@storybook/react';
import OrderCard from './OrderCard';

const meta = {
  component: OrderCard,
  title: 'order-list-page/OrderCard',
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof OrderCard>;

const order = {
  orderId: 1,
  products: [
    {
      quantity: 1,
      product: {
        id: 1,
        name: '도밥',
        price: 10000,
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/47ea49b2-19c5-4c2b-a98a-7a4c6e9d241a.jpg?h=400&w=400',
      },
    },
    {
      quantity: 1,
      product: {
        id: 2,
        name: '도오밥',
        price: 20000,
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/47ea49b2-19c5-4c2b-a98a-7a4c6e9d241a.jpg?h=400&w=400',
      },
    },
  ],
  totalPrice: 30000,
  usedPoint: 0,
  deliveryFee: 3000,
  orderedAt: '2023/05/26 02:25:36',
};

export const Default: Story = {
  render: () => <OrderCard order={order} isDetail />,
};

export const WithDetailButton: Story = {
  render: () => <OrderCard order={order} />,
};
