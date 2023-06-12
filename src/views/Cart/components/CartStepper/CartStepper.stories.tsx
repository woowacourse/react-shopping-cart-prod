import type { Meta, StoryObj } from '@storybook/react';
import CartStepper from './CartStepper';

const meta = {
  component: CartStepper,
  title: 'CartQuantityField',
} satisfies Meta<typeof CartStepper>;

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
