import type { Meta, StoryObj } from '@storybook/react';
import PageHeader from './PageHeader';

const meta = {
  title: 'PageHeader',
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '장바구니 목록',
  },
};
