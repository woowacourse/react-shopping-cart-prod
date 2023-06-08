import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductItemSkeleton from './ProductItemSkeleton';

/**
 * `ProductItemSkeleton`은 상품의 로딩 상태를 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof ProductItemSkeleton> = {
  title: 'Skeleton/ProductItemSkeleton',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: ProductItemSkeleton,
};

export default meta;

type Story = StoryObj<typeof ProductItemSkeleton>;

export const DefaultProductItemSkeleton: Story = {
  args: {},
};
