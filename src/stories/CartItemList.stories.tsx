import { Meta, StoryObj } from '@storybook/react';

import CartItemList from '../components/Cart/CartItemList';

const meta = {
  title: 'Cart/CartItemList',
  component: CartItemList,
  tags: ['autodocs'],
  argTypes: {},

  render: (args, { loaded: { products } }) => <CartItemList {...products} />,
} satisfies Meta<typeof CartItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'images/정사각-420.jpeg',
  },
};

export const Default: Story = {
  args: {
    cartProduct: mockProduct,
  },
};
