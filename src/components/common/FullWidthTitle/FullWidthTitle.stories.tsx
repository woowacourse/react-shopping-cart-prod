import type { Meta, StoryObj } from '@storybook/react';
import FullWidthTitle from './FullWidthTitle';

const meta = {
  title: 'pages/FullWidthTitle',
  component: FullWidthTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof FullWidthTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '여기에 테스트 제목',
  },
};
