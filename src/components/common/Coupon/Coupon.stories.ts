import type { Meta, StoryObj } from '@storybook/react';
import Coupon from './Coupon';

const meta: Meta<typeof Coupon> = {
  title: 'Coupon',
  component: Coupon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: '우아한테크코스 레벨2',
    couponName: '신나는 협업 미션!',
    footer: '- 당장 코딩하러 가기',
  },
};

export const WithDownloadButton: Story = {
  ...Default,

  argTypes: {
    onDownloadClick: {
      action: '쿠폰 다운로드 요청 보냄!',
    },
  },
};
