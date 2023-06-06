import type { Meta, StoryObj } from '@storybook/react';
import OrderCard from './OrderCard';

const meta: Meta<typeof OrderCard> = {
  title: 'OrderCard',
  component: OrderCard,
};

export default meta;

type Story = StoryObj<typeof OrderCard>;

export const Default: Story = {
  args: {
    orderId: 1,
    items: [
      {
        id: 1,
        quantity: 5,
        product: {
          id: 1,
          name: 'SPRAYCAN TEE',
          price: 68000,
          imageUrl:
            'https://cdn.shopify.com/s/files/1/0099/5708/1143/products/1904905_BLAC_2.jpg?v=1683635495',
        },
      },
      {
        id: 2,
        quantity: 10,
        product: {
          id: 2,
          name: 'SPRAYCAN TEE',
          price: 68000,
          imageUrl:
            'https://cdn.shopify.com/s/files/1/0099/5708/1143/products/1904905_WHIT_2_c8b4bbc9-8f9d-4cf3-a0e7-71dea5ea877e.jpg?v=1683635484',
        },
      },
    ],
    productPrice: 30000,
    discountPrice: 3000,
    deliveryFee: 3000,
    totalPrice: 30000,
  },
};
