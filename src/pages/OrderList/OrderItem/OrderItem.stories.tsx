import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import OrderItem from '.';

/**
 * `OrderItem`은 하나의 주문 상품 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof OrderItem> = {
  title: 'Product/OrderItem',
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
  component: OrderItem,
};

export default meta;

type Story = StoryObj<typeof OrderItem>;

/**
 * 주문 상품의 기본 스토리입니다.
 */
export const DefaultOrderItem: Story = {
  args: {},
};
