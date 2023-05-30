import { Meta, StoryObj } from '@storybook/react';

import OrderItem from '../../components/order/OrderItem/OrderItem';

const meta = {
  title: 'ShoppingCart/Order/OrderItem',
  component: OrderItem,
  args: {
    id: 1685433648003,
    orderedItems: [
      {
        quantity: 1,
        product: {
          discountRate: 5,
          discountedPrice: 57000,
          id: 3,
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg?h=400&w=400',
          name: '종이용기(900cc)-너무맛있겠다',
          price: 60000,
        },
      },
      {
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
    ],
    orderedAt: new Date(),
    totalItemPrice: 117600,
    discountedTotalItemPrice: 97320,
    shippingFee: 0,
    totalPrice: 97320,
  },
} satisfies Meta<typeof OrderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
