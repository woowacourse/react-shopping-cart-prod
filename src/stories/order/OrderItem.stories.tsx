import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';
import OrderItem from '../../components/order/OrderItem';

const meta = {
  title: 'ShoppingCart/order/OrderItem',
  component: OrderItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Style.Container>
        <Story />
      </Style.Container>
    ),
  ],
} satisfies Meta<typeof OrderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderItemInfo: {
      id: 1,
      orderNumber: 1,
      date: '2023-05-30',
      products: [
        {
          id: 1,
          name: '지구',
          price: 1000,
          imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
          quantity: 1,
        },
        {
          id: 3,
          name: '달',
          price: 300,
          imageUrl: 'https://cdn.pixabay.com/photo/2016/04/02/19/40/moon-1303512__480.png',
          quantity: 3,
        },
      ],
    },
  },
};

const Style = {
  Container: styled.li`
    width: 550px;
    padding: 20px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
