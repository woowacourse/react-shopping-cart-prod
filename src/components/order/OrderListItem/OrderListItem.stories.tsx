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
    orderItem: {
      id: 1685864058206,
      quantity: 1,
      price: 16900,
      name: '서울우유 비요뜨 쵸코링 138g x12개',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/73f2e0cf-1504-448f-b8f7-7ef47889fc85.jpg?h=400&w=400',
    },
  },
};
