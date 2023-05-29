import { Meta, StoryObj } from '@storybook/react';

import Title from '../components/Common/Title';

const meta = {
  title: 'Common/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Title content',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '장바구니',
  },
};
