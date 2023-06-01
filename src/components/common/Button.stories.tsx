import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'common/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '예시 버튼',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: '예시 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'medium',
    children: '예시 버튼',
  },
};

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: '예시 버튼',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: '예시 버튼',
  },
};
