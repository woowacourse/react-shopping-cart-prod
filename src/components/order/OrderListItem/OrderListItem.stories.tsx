import type { Meta, StoryObj } from '@storybook/react';
import OrderListItem from './OrderListItem';

const meta = {
  title: 'order/OrderListItem',
  component: OrderListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 0,
    quantity: 1,
    product: {
      id: 1,
      name: '순살치킨 1KG',
      price: 9900,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
    },
  },
};
