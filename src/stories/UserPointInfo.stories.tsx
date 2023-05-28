import { Meta, StoryObj } from '@storybook/react';

import UserPointInfo from '../components/Cart/UserPointInfo';

const meta = {
  title: 'Cart/UserPointInfo',
  component: UserPointInfo,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserPointInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
