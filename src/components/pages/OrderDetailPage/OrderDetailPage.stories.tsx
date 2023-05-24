import type { Meta, StoryObj } from '@storybook/react';
import OrderDetailPage from './OrderDetailPage';

const meta = {
  title: 'pages/OrderDetailPage',
  component: OrderDetailPage,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
