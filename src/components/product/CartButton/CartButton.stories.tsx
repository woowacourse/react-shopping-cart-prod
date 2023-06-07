import type { Meta, StoryObj } from '@storybook/react';
import CartButton from './CartButton';

const meta = {
  title: 'product/CartButton',
  component: CartButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
