import { Meta } from '@storybook/react';
import CartItem from '.';
import { CartItem as CartItemType } from 'types/api/carts';

const cartItem = {
  component: CartItem,
  title: 'Cart/CartItem',
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof CartItem>;

export default cartItem;

const mock: CartItemType = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    price: 8000,
    salePrice: 2000,
    isOnSale: true,
    name: '춘식이 아이템',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg',
  },
};

const Template = () => {
  return <CartItem cartItem={mock} />;
};

export const Default = Template.bind({});
