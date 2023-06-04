import { Meta, StoryObj } from '@storybook/react';
import CheckOutProductCard from './CheckOutProductCard';
import { CartProduct } from 'types/product';

const meta = {
  component: CheckOutProductCard,
  title: 'checkout-page/CheckOutProductCard',
} satisfies Meta<typeof CheckOutProductCard>;

export default meta;
type Story = StoryObj<typeof CheckOutProductCard>;

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
  render: () => <CheckOutProductCard checkedCartProduct={cartProducts} />,
};
