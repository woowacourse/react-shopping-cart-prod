import { Meta, StoryObj } from '@storybook/react';
import CartProductCard from './CartProductCard';
import { CartProduct } from 'types/product';

const meta = {
  component: CartProductCard,
  title: 'CartProductCard',
  argTypes: {
    cartProduct: {
      description: '장바구니의 각 상품 입니다.',
    },
  },
} satisfies Meta<typeof CartProductCard>;

export default meta;
type Story = StoryObj<typeof CartProductCard>;

const cartProduct: CartProduct = {
  quantity: 5,
  product: {
    id: 1,
    name: '순살치킨 해마로 1kg 냉동',
    price: 10800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
  },
};

export const Default: Story = {
  render: () => <CartProductCard cartProduct={cartProduct} />,
};
