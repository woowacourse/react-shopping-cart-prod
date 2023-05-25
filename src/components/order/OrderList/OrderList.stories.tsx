import type { Meta, StoryObj } from '@storybook/react';
import OrderList from './OrderList';

const meta = {
  title: 'order/OrderList',
  component: OrderList,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
