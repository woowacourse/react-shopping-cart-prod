import { Meta, StoryObj } from '@storybook/react';

import OrderProductItem from '../components/Order/OrderProductItem';

const meta = {
  title: 'Order/OrderProductItem',
  component: OrderProductItem,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OrderProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCard = {
  quantity: 1,
  product: {
    productId: 1,
    price: 43400,
    name: 'PET보틀-정사각(420ml)',
    imageUrl: 'images/정사각-420.jpeg',
  },
};

export const Default: Story = {
  args: {
    orderProduct: mockCard,
  },
};
