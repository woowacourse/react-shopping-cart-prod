import { Meta, StoryObj } from '@storybook/react';

import ProductList from '../components/Product/ProductList';
import fetchApis from '../apis/fetchApis';
import { FETCH_URLS } from '../constants/urls';

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
      const { getData } = fetchApis('도치');
      const something = await getData(FETCH_URLS.products);

      return {
        products: something,
      };
    },
  ],
};
