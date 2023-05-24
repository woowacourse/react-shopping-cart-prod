import type { Meta, StoryObj } from '@storybook/react';
import OrderPage from './OrderPage';

const meta = {
  title: 'pages/OrderPage',
  component: OrderPage,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
