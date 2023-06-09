import type { Meta, StoryObj } from '@storybook/react';
import PriceFormat from './PriceFormat';

const meta = {
  title: 'common/PriceFormat',
  component: PriceFormat,
} satisfies Meta<typeof PriceFormat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 12000000,
  },
};

export const WithLargeFontSize: Story = {
  args: {
    price: 12000000,
  },
  decorators: [
    (Story) => (
      <h1 style={{ fontSize: '72px' }}>
        <Story />
      </h1>
    ),
  ],
};
