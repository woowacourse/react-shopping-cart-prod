import type { Meta, StoryObj } from '@storybook/react';
import ExampleProduct from '../assets/images/example-product.jpg';
import OrderCartItem from './OrderCartItem';
import OrderListItem from './OrderListItem';

const meta = {
  title: 'OrderListItem',
  component: OrderListItem,
} satisfies Meta<typeof OrderListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    order: {
      id: 13290,
      cartItems: [],
      savingRate: 10,
      usedPoints: 0,
    },
  },
};

export const WithOrderCartItem: Story = {
  args: {
    order: {
      id: 13290,
      cartItems: [],
      savingRate: 10,
      usedPoints: 0,
    },
    children: (
      <>
        <OrderCartItem
          productName="아이크"
          imageUrl={ExampleProduct}
          productPrice={2000}
          quantity={3}
        />
        <OrderCartItem
          productName="아이크"
          imageUrl={ExampleProduct}
          productPrice={2000}
          quantity={3}
        />
        <OrderCartItem
          productName="아이크"
          imageUrl={ExampleProduct}
          productPrice={2000}
          quantity={3}
        />
      </>
    ),
  },
};
