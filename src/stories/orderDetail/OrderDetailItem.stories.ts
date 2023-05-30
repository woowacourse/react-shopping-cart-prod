import { Meta, StoryObj } from '@storybook/react';

import OrderDetailItem from '../../components/orderDetail/OrderDetailItem/OrderDetailItem';

const meta = {
  title: 'ShoppingCart/OrderDetail/OrderDetailItem',
  component: OrderDetailItem,
  args: {
    quantity: 1,
    product: {
      discountRate: 0,
      discountedPrice: 57600,
      id: 2,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
      name: '올인원 세트-물티수저',
      price: 57600,
    },
  },
} satisfies Meta<typeof OrderDetailItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
