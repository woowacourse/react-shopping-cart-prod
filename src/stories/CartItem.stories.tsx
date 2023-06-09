import { Meta, StoryObj } from '@storybook/react';

import CartItem from '../components/Cart/CartItem';

const meta = {
  title: 'Cart/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  cartItemId: 1,
  quantity: 4,
  product: {
    productId: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'images/정사각-420.jpeg',
    stock: 4,
  },
};

export const Default: Story = {
  args: {
    cartItem: mockProduct,
  },
};
