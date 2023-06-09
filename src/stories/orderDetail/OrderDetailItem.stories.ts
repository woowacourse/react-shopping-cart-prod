import type { Meta, StoryObj } from '@storybook/react';

import OrderDetailItem from '../../components/orderDetail/OrderDetailItem/OrderDetailItem';

const meta = {
  title: 'ShoppingCart/OrderDetail/OrderDetailItem',
  component: OrderDetailItem,
  args: {
    id: 2,
    name: '올인원 세트-물티수저',
    quantity: 1,
    price: 57600,
    discountRate: 0,
    discountedPrice: 57600,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg',
  },
} satisfies Meta<typeof OrderDetailItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
