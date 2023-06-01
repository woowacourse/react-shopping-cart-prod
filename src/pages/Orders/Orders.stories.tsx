import type { Meta, StoryObj } from '@storybook/react';
import Orders from '.';

const meta = {
  component: Orders,
  title: 'Orders',
} satisfies Meta<typeof Orders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
