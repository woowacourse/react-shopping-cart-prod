import type { Meta, StoryObj } from '@storybook/react';
import SummaryPriceInfo from './SummaryPriceInfo';

const meta = {
  title: 'pages/SummaryPriceInfo',
  component: SummaryPriceInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof SummaryPriceInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Price: Story = {
  args: {
    type: 'price',
    name: '여기에 항목 입력',
    price: 1234567,
  },
};

export const Points: Story = {
  args: {
    type: 'points',
    name: '여기에 항목 입력',
    price: 890,
  },
};
