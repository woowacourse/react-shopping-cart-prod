import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import OrderItem from '.';

/**
 * `CartItem`은 장바구니에 담긴 상품을 나타내는 컴포넌트입니다.
 */
// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof OrderItem> = {
  title: 'OrderItem',
  component: OrderItem,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
};

export default meta;

type Story = StoryObj<typeof OrderItem>;
