import { Meta, StoryObj } from '@storybook/react';

import OrderedProductItem from '../../components/Order/OrderedProductItem';

const meta = {
  title: 'Order/OrderedProductItem',
  component: OrderedProductItem,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderedProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  quantity: 3,
  imageUrl: 'images/정사각-420.jpeg',
};

export const Default: Story = {
  args: {
    ...mockProduct,
  },
};
