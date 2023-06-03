import type { Meta, StoryObj } from '@storybook/react';
import Coupon from './Coupon';

const meta: Meta<typeof Coupon> = {
  title: 'Coupon',
  component: Coupon,
  tags: ['autodocs'],

  args: {
    couponName: '신나는 협업 미션!',
    type: 'percent',
    amount: 10,
    footer: '- 당장 코딩하러 가기',
  },

  argTypes: {
    type: {
      name: '할인 종류',
      options: {
        퍼센트: 'percent',
        원: 'amount',
      },
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDownloadClick: undefined,
  },
};

export const WithDownloadButton: Story = {
  argTypes: {
    onDownloadClick: {
      action: '쿠폰 다운로드 요청 보냄!',
    },
  },
};
