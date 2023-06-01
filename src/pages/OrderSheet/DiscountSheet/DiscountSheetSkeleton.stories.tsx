import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import DiscountSheetSkeleton from './DiscountSheetSkeleton';

/**
 * `DiscountSheetSkeleton`은 주문서 - 할인/쿠폰 영역의 로딩 상태를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof DiscountSheetSkeleton> = {
  title: 'Skeleton/DiscountSheetSkeleton',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: DiscountSheetSkeleton,
};

export default meta;

type Story = StoryObj<typeof DiscountSheetSkeleton>;

export const DefaultDiscountSheetSkeleton: Story = {
  args: {},
};
