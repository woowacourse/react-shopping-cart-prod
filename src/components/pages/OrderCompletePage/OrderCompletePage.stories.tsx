import type { Meta, StoryObj } from '@storybook/react';
import OrderCompletePage from './OrderCompletePage';

const meta = {
  title: 'pages/OrderCompletePage',
  component: OrderCompletePage,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderCompletePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
