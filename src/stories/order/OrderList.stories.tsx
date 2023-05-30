import { Meta, StoryObj } from '@storybook/react';

import OrderList from '../../components/Order/OrderList';
import orderApis from '../../apis/order';

const meta = {
  title: 'Order/OrderList',
  component: OrderList,
  tags: ['autodocs'],
  render: (args, { loaded: { orders } }) => <OrderList {...orders} />,
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      products: await orderApis().getOrders(),
    }),
  ],
};
