import type { Meta, StoryObj } from '@storybook/react';
import OrderList from './OrderList';

const meta = {
  title: 'order/OrderList',
  component: OrderList,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOrder = {
  id: 1685864066714,
  price: 22700,
  orderDate: '2023-06-04T07:34:26.714Z',
  orders: [
    {
      id: 1685864057570,
      quantity: 1,
      price: 5800,
      name: '오레오 600g 화이트/초코',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/3fe3f038-f00e-43f5-b289-23f1b6f8255d.jpg?h=400&w=400',
    },
    {
      id: 1685864058206,
      quantity: 1,
      price: 16900,
      name: '서울우유 비요뜨 쵸코링 138g x12개',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/73f2e0cf-1504-448f-b8f7-7ef47889fc85.jpg?h=400&w=400',
    },
    {
      id: 1685865139168,
      quantity: 1,
      price: 9900,
      name: '순살치킨 1KG',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
    },
    {
      id: 1685865139817,
      quantity: 1,
      price: 6200,
      name: '리코스 나초칩 454g',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/bf308ce9-cbe5-45a0-808a-4fdda168f992.jpg?h=400&w=400',
    },
    {
      id: 1685865140504,
      quantity: 1,
      price: 5800,
      name: '오레오 600g 화이트/초코',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/3fe3f038-f00e-43f5-b289-23f1b6f8255d.jpg?h=400&w=400',
    },
    {
      id: 1685865141772,
      quantity: 1,
      price: 32000,
      name: '허쉬 초콜릿칩 모찌쿠키 10ea',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/e99a458a-1b96-451b-ad62-952396643847.jpg',
    },
  ],
};

export const Default: Story = {
  args: {
    order: { ...defaultOrder },
  },
};

export const WithShowDetailButton: Story = {
  args: {
    order: { ...defaultOrder },
    needsDetailButton: true,
  },
};

export const WithSummary: Story = {
  args: {
    order: { ...defaultOrder },
    isSummary: true,
  },
};
