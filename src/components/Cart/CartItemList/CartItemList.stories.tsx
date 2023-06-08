import { Meta, StoryObj } from '@storybook/react';
import CartItemList from '.';
import data from '../../../mocks/cartList.json';

const cartItemList = {
  component: CartItemList,
  title: 'Cart/CartItemList',
  tags: ['autodocs'],
  args: {
    cartList: data,
  },
} satisfies Meta<typeof CartItemList>;

export default cartItemList;

type Story = StoryObj<typeof cartItemList>;

export const Default: Story = {};
