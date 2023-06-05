import { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Common/Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEFAULT_ARGS = {
  children: 'Button',
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const primary: Story = {
  args: { ...DEFAULT_ARGS, hasPrimary: true },
};

export const Secondary: Story = {
  args: { ...DEFAULT_ARGS, hasPrimary: false },
};

export const SecondaryWithBorder: Story = {
  args: { ...DEFAULT_ARGS, hasPrimary: false, hasBorder: true },
};

export const Disabled: Story = {
  args: { ...DEFAULT_ARGS, disabled: true },
};
