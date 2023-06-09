import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from '.';

const meta = {
  component: ProductItem,
  title: 'ProductItem',
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QuantityZero = {
  args: {
    product: {
      id: 1,
      name: '귀여운 고양이',
      price: 100000000,
      imageUrl: 'https://placekitten.com/300/300',
    },
  },
} satisfies Story;

export const QuantityOverZero = {
  args: {
    product: {
      id: 2,
      name: '매서운 강아지',
      price: 1324000000,
      imageUrl: 'https://placedog.net/300/300',
    },
  },
} satisfies Story;
