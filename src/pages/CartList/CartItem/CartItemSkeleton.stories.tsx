import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import CartItemSkeleton from './CartItemSkeleton';

/**
 * `CartItemSkeleton`은 장바구니에 담긴 상품의 로딩 상태를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof CartItemSkeleton> = {
  title: 'Skeleton/CartItemSkeleton',
  component: CartItemSkeleton,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
};

export default meta;

type Story = StoryObj<typeof CartItemSkeleton>;

export const DefaultCartItemSkeleton: Story = {
  args: {},
};
