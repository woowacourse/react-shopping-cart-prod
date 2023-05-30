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
    orderId: 13290,
  },
};

export const WithOrderCartItem: Story = {
  args: {
    orderId: 12830,
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
