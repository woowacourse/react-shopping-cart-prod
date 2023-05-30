import type { Meta, StoryObj } from '@storybook/react';
import OrderList from './OrderCart';

const meta: Meta<typeof OrderList> = {
  title: 'OrderList',
  component: OrderList,
};

export default meta;

type Story = StoryObj<typeof OrderList>;

export const Default: Story = {};
