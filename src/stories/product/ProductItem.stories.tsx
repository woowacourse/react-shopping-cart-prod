import type { Meta, StoryObj } from '@storybook/react';

import ProductItem from '../../components/product/ProductItem/ProductItem';
import ProductItemSkeleton from '../../components/product/ProductItem/ProductItemSkeleton';

const meta = {
  title: 'ShoppingCart/Product/ProductItem',
  component: ProductItem,
  args: {
    id: 1,
    name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
    price: 61100,
    discountRate: 0,
    discountedPrice: 61100,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg?h=400&w=400',
  },
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => {
    return (
      <div style={{ width: '200px' }}>
        <ProductItemSkeleton />
      </div>
    );
  },
};
