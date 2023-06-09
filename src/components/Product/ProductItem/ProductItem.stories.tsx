import { Meta, StoryObj } from '@storybook/react';
import ProductItem from '.';
import { ProductItem as ProductItemType } from 'types/api/products';

const mock: ProductItemType = {
  id: 1,
  price: 8000,
  name: '춘식이',
  isOnSale: false,
  salePrice: 0,
  imageUrl:
    'data:image/png;base64,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',
};

const productItem = {
  component: ProductItem,
  title: 'Product/ProductItem',
  tags: ['autodocs'],
  args: {
    product: mock,
  },
} satisfies Meta<typeof ProductItem>;

export default productItem;

type Story = StoryObj<typeof productItem>;

export const Default: Story = {
  render: () => {
    return <ProductItem product={mock} />;
  },
};
