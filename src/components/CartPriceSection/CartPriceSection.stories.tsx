import { Meta, StoryObj } from '@storybook/react';
import CartPriceSection from './CartPriceSection';

const meta = {
  component: CartPriceSection,
  title: 'CartPriceSection',
} satisfies Meta<typeof CartPriceSection>;

export default meta;
type Story = StoryObj<typeof CartPriceSection>;

export const Default: Story = {
  render: () => <CartPriceSection />,
};
