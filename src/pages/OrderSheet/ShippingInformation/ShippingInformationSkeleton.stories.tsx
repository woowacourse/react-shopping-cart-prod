import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ShippingInformationSkeleton from './ShippingInformationSkeleton';

/**
 * `ShippingInformationSkeleton`은 주문서 - 배송정보 영역의 로딩 상태를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof ShippingInformationSkeleton> = {
  title: 'Skeleton/ShippingInformationSkeleton',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: ShippingInformationSkeleton,
};

export default meta;

type Story = StoryObj<typeof ShippingInformationSkeleton>;

export const DefaultShippingInformationSkeleton: Story = {
  args: {},
};
