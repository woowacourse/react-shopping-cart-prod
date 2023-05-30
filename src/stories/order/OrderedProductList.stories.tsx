import { Meta, StoryObj } from '@storybook/react';

import OrderedProductList from '../../components/Order/OrderedProductList';

const meta = {
  title: 'Order/OrderedProductList',
  component: OrderedProductList,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderedProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts = [
  {
    id: 1,
    quantity: 3,
    product: {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: 'images/정사각-420.jpeg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: 'images/밀크티-370.jpeg',
    },
  },
];

export const Default: Story = {
  args: {
    orderItems: mockProducts,
  },
};
