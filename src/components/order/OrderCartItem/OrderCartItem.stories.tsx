import type { Meta, StoryObj } from '@storybook/react';
import OrderCartItem from './OrderCartItem';

const meta = {
  title: 'order/OrderCartItem',
  component: OrderCartItem,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderCartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const item = {
  id: 0,
  quantity: 1,
  product: {
    id: 1,
    name: '순살치킨 1KG',
    price: 9900,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
  },
};

export const Default: Story = {
  args: {
    item,
  },
};
