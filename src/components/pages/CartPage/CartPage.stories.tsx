import type { Meta, StoryObj } from '@storybook/react';
import { customViewPorts } from '../../../../.storybook/preview';

import { CartPage } from './CartPage';

const meta = {
  title: 'ShoppingCart/ShoppingCart',
  component: CartPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      Default: customViewPorts.Mobile,
      defaultViewport: 'Mobile',
    },
  },
};
