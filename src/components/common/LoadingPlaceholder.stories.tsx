import type { Meta, StoryObj } from '@storybook/react';
import LoadingPlaceholder from './LoadingPlaceholder';

const meta = {
  title: 'common/LoadingPlaceholder',
  component: LoadingPlaceholder,
} satisfies Meta<typeof LoadingPlaceholder>;

export default meta;

type Story = StoryObj<typeof LoadingPlaceholder>;

export const Default: Story = {
  args: {
    title: '제품 정보를 불러오는 중입니다 ...',
  },
};

export const WithoutTitle: Story = {};
