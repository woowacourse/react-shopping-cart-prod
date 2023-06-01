import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'common/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력 컴포넌트입니다.',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
    placeholder: '입력 컴포넌트입니다.',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'medium',
    placeholder: '입력 컴포넌트입니다.',
  },
};
