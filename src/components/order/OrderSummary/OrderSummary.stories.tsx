import type { Meta, StoryObj } from '@storybook/react';
import OrderSummary from './OrderSummary';

const meta = {
  title: 'pages/OrderSummary',
  component: OrderSummary,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
