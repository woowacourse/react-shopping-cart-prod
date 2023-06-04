import { Meta, StoryObj } from '@storybook/react';
import LoadingErrorCard from './LoadingErrorCard';

const meta = {
  component: LoadingErrorCard,
  title: 'LoadingErrorCard',

  argTypes: {
    children: {
      description: '로딩 에러 메세지 내용입니다.',
    },
    onClickRetryButton: {
      description: '새로고침 버튼 클릭시 실행할 함수입니다.',
    },
  },
} satisfies Meta<typeof LoadingErrorCard>;

export default meta;
type Story = StoryObj<typeof LoadingErrorCard>;

export const Default: Story = {
  render: () => <LoadingErrorCard onClickRetryButton={() => {}}>로딩 에러메세지</LoadingErrorCard>,
};
