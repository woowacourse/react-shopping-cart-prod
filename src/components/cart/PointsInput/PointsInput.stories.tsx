import type { Meta, StoryObj } from '@storybook/react';
import PointsInput from './PointsInput';

const meta = {
  title: 'cart/PointsInput',
  component: PointsInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PointsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
