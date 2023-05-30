import type { Meta, StoryObj } from '@storybook/react';
import OrderList from '../../components/order/OrderList';

const meta = {
  title: 'ShoppingCart/order/OrderList',
  component: OrderList,
  tags: ['autodocs'],
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orders: [
      {
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
      {
        id: 2,
        orderNumber: 2,
        date: '2023-05-31',
        products: [
          {
            id: 12,
            name: '사건의 지평선',
            price: 700000000,
            imageUrl:
              'https://media.istockphoto.com/id/1299315343/ko/%EC%82%AC%EC%A7%84/%EB%B8%94%EB%9E%99%ED%99%80%EC%9D%98-%EC%A4%91%EB%A0%A5%EC%9E%A5-%EC%A4%91%EB%A0%A5%EC%9D%98-%EB%A7%A4%EB%A0%A5-%EC%9A%B4%EC%84%9D%EA%B3%BC-%EC%86%8C%ED%96%89%EC%84%B1%EC%9D%B4-%EC%82%BC%EC%BC%9C%EC%A7%88-%EB%AC%B4%EB%A0%B5.jpg?b=1&s=170667a&w=0&k=20&c=2fMcKJ-RNdzS1-v0NXjOVssmicbAH0twoCt_0AwCHOk=',
            quantity: 2,
          },
          {
            id: 11,
            name: '천왕성',
            price: 10000,
            imageUrl: 'https://cdn.pixabay.com/photo/2012/01/09/10/56/uranus-11625__480.jpg',
            quantity: 10,
          },
        ],
      },
    ],
  },
};
