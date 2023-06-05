import { Meta, StoryObj } from '@storybook/react';

import Product from '../components/Product/Product';

const meta = {
  title: 'Product/Product',
  component: Product,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Product>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  productId: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  imageUrl: 'images/정사각-420.jpeg',
  stock: 12,
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};
