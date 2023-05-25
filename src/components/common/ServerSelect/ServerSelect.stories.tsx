import type { Meta, StoryObj } from '@storybook/react';
import ServerSelect from './ServerSelect';

const meta = {
  title: 'common/ServerSelect',
  component: ServerSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof ServerSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
