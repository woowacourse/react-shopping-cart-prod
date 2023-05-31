import { Meta, StoryObj } from '@storybook/react';

import CartProductList from '../components/Cart/CartProductList';

import fetchApis from '../apis/fetchApis';

const meta = {
  title: 'Cart/CartProductList',
  component: CartProductList,
  tags: ['autodocs'],
  render: (args, { loaded: { products } }) => <CartProductList {...products} />,
} satisfies Meta<typeof CartProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => {
      const { getData } = fetchApis('도치');
      return {
        products: await getData('/cart-items'),
      };
    },
  ],
};
