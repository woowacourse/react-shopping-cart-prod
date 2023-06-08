import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import OrderSheetItem from '.';

/**
 * `OrderSheetItem`은 주문서에 있는 상품의 컴포넌트입니다.
 */
const meta: Meta<typeof OrderSheetItem> = {
  title: 'Product/OrderSheetItem',
  component: OrderSheetItem,
  decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
};

export default meta;

type Story = StoryObj<typeof OrderSheetItem>;

/**
 * `DefaultOrderSheetItem`은 주문서에 있는 상품의 기본 스토리입니다.
 */
export const DefaultOrderSheetItem: Story = {
  args: {
    product: {
      id: 1,
      price: 20000,
      name: '[밀키트 SET] 아메리칸식 디너',
      imageUrl:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    quantity: 3,
  },
};
