import type { Meta, StoryObj } from '@storybook/react';
import OrderItem from './OrderItem';

const meta = {
  title: 'box/OrderItem',
  component: OrderItem,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderItem>;

export default meta;

type Story = StoryObj<typeof meta>;
