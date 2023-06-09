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

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '예시 버튼',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
    children: '예시 버튼',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'medium',
    children: '예시 버튼',
  },
};

export const VariantContained: Story = {
  args: {
    variant: 'contained',
    children: '예시 버튼',
  },
};

export const VariantText: Story = {
  args: {
    variant: 'text',
    children: '예시 버튼',
  },
};
