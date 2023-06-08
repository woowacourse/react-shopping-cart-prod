import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import GlobalStyle from '@Styles/GlobalStyle';

import CouponSkeleton from './CouponSkeleton';

/**
 * `CouponSkeleton`은 쿠폰의 로딩 상태를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof CouponSkeleton> = {
  title: 'Skeleton/CouponSkeleton',
  component: CouponSkeleton,
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <GlobalStyle isModalOpen={false} />
        {storyFn()}
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CouponSkeleton>;

export const DefaultCouponSkeleton: Story = {
  args: {},
};
