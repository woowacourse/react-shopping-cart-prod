import { Meta, StoryObj } from '@storybook/react';
import CheckOutPriceSection from './CheckOutPriceSection';

const meta = {
  component: CheckOutPriceSection,
  title: 'checkout-page/CheckOutPriceSection',
} satisfies Meta<typeof CheckOutPriceSection>;

export default meta;
type Story = StoryObj<typeof CheckOutPriceSection>;

export const Default: Story = {
  render: () => <CheckOutPriceSection />,
};
