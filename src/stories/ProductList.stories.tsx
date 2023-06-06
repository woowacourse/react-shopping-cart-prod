import type { Meta, StoryObj } from '@storybook/react';
import products from '../mocks/productList.json';
import ProductList from '../components/product/ProductList';

const meta = {
  title: 'ShoppingCart/product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products: products,
  },
};
