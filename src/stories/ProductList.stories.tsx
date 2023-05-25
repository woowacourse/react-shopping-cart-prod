import { Meta, StoryObj } from '@storybook/react';

import ProductList from '../components/Product/ProductList';

import productApis from '../../src/apis/products';

const meta = {
  title: 'Product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  render: (args, { loaded: { products } }) => <ProductList {...products} />,
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => {
      const { getData } = productApis('도치', '/products');
      const something = await getData();

      return {
        products: something,
      };
    },
  ],
};
