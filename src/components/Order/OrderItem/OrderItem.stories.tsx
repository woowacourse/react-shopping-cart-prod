import { Meta, StoryObj } from '@storybook/react';
import OrderItem from '.';

const mock = {
  id: 1,
  price: 7600,
  quantity: 3,
  name: '깜짝 놀란 춘식이',
  imageUrl:
    'https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg',
};

const orderItem = {
  component: OrderItem,
  title: 'Order/OrderItem',
  tags: ['autodocs'],
  args: {
    item: mock,
  },
} satisfies Meta<typeof OrderItem>;

export default orderItem;

type Story = StoryObj<typeof orderItem>;

export const Default: Story = {
  render: () => {
    return <OrderItem item={mock} />;
  },
};
