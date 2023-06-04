import { Meta, StoryObj } from '@storybook/react';
import EmptyDataCard from './EmptyDataCard';

const meta = {
  component: EmptyDataCard,
  title: 'EmptyDataCard',
  argTypes: {
    children: {
      description: '데이터가 비어있음을 설명하는 메세지입니다.',
    },
  },
} satisfies Meta<typeof EmptyDataCard>;

export default meta;
type Story = StoryObj<typeof EmptyDataCard>;

export const Default: Story = {
  render: () => <EmptyDataCard>특정 데이터가 비어있어요</EmptyDataCard>,
};
