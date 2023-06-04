import { Meta, StoryObj } from '@storybook/react';
import CartPriceSection from './CartPriceSection';

const meta = {
  component: CartPriceSection,
  title: 'shopping_cart_page/CartPriceSection',
} satisfies Meta<typeof CartPriceSection>;

export default meta;
type Story = StoryObj<typeof CartPriceSection>;

export const Default: Story = {
  render: () => <CartPriceSection />,
};
