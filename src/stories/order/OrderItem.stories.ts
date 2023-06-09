import type { Meta, StoryObj } from '@storybook/react';

import OrderItem from '../../components/order/OrderItem/OrderItem';
import { mockOrderList } from '../mocks/mockOrderList';

const meta = {
  title: 'ShoppingCart/Order/OrderItem',
  component: OrderItem,
  args: { ...mockOrderList[0] },
} satisfies Meta<typeof OrderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
