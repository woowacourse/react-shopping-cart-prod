import type { Meta, StoryObj } from '@storybook/react';
import Orders from '.';

const meta = {
  component: Orders,
  title: 'Pages',
} satisfies Meta<typeof Orders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrdersPage: Story = {
  args: {},
};
