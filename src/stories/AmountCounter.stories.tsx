import { Meta, StoryObj } from '@storybook/react';

import AmountCounter from '../components/Common/AmountCounter';
import useCartProducts from '../hooks/useCartProducts';

type AmountCounterSizeType = 'small' | 'medium';

interface AmountCounterProps {
  variant: AmountCounterSizeType;
  cartItemId: number;
  count: number;
}

const meta: Meta = {
  title: 'Common/AmountCounter',
  component: AmountCounter,
  tags: ['autodocs'],
  args: {
    variant: 'small',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const product = {
  id: 1,
  name: '치킨',
  price: 10000,
  imageUrl:
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
};

export const Default: Story = (args: AmountCounterProps) => {
  const { targetProduct } = useCartProducts(product);

  if (!targetProduct) return <AmountCounter {...args} />;

  return (
    <AmountCounter
      {...args}
      count={targetProduct.quantity}
      cartItemId={targetProduct.id}
    />
  );
};

Default.args = {};
