import type { Meta, StoryObj } from '@storybook/react';
import Points from './Points';

const meta = {
  title: 'common/Points',
  component: Points,
  tags: ['autodocs'],
} satisfies Meta<typeof Points>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 123456,
  },
};
