import PaymentsView from 'src/components/PaymentsView';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof PaymentsView>;
const meta: Meta<typeof PaymentsView> = {
  title: 'Common/PaymentsView',
  component: PaymentsView,
};
export default meta;

export const Default: Story = {
  args: {
    paymentAmount: {
      originalPrice: 52500, // 상품들의 주문 가격

      // 할인 정책, 할인율, 적용시 가격을 담은 객체의 배열
      discounts: [
        {
          discountPolicy: '첫 주문 10% 할인',
          discountAmount: 5250,
        },
      ],

      // 정책이 모두 적용된 총 가격
      discountedPrice: 47250,
      deliveryFee: 3000,

      // 배송비 + 물건 총 가격
      finalPrice: 50250,
    },
    puschaseOption: false,
  },
};
