import { Meta, StoryObj } from '@storybook/react';

import CartItem from '../../components/cart/CartItem/CartItem';
import CartItemSkeleton from '../../components/cart/CartItem/CartItemSkeleton';

const meta = {
  title: 'ShoppingCart/Cart/CartItem',
  component: CartItem,
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    cartItemId: 2,
    quantity: 7,
    name: '올인원 세트-물티수저',
    price: 57600,
    discountRate: 0,
    discountedPrice: 57600,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
  },
};

export const ItemDiscount: Story = {
  args: {
    cartItemId: 2,
    quantity: 7,
    name: '종이용기(900cc)-너무맛있겠다',
    price: 60000,
    discountRate: 5,
    discountedPrice: 57000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg?h=400&w=400',
  },
};

export const Skeleton: Story = {
  render: () => {
    return <CartItemSkeleton />;
  },
};
