import { Meta, StoryObj } from '@storybook/react';
import OrderItemList from '.';
import data from '../../../mocks/orderList.json';

const orderItemList = {
  component: OrderItemList,
  title: 'Order/OrderItemList',
  tags: ['autodocs'],
  args: {
    order: data.orders[0],
  },
} satisfies Meta<typeof OrderItemList>;

export default orderItemList;

type Story = StoryObj<typeof orderItemList>;

export const Default: Story = {};
