import { Meta, StoryObj } from '@storybook/react';
import OrderProductCard from './OrderProductCard';
import { CartProduct } from 'types/product';

const meta = {
  component: OrderProductCard,
  title: 'OrderProductCard',
} satisfies Meta<typeof OrderProductCard>;

export default meta;
type Story = StoryObj<typeof OrderProductCard>;

const cartProducts: CartProduct = {
  quantity: 1,
  product: {
    id: 2,
    name: '사조오양 치킨텐더 1000gx1개',
    price: 9900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
  },
};

export const Default: Story = {
  render: () => <OrderProductCard checkedCartProduct={cartProducts} />,
};
