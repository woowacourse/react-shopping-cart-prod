import { Meta } from '@storybook/react';
import OrderListComponent from '../../components/order/OrderList';
import { styled } from 'styled-components';

const meta = {
  component: OrderListComponent,
  title: 'Components/OrderListComponent',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <S.StoryWrapper>
          <Story />
        </S.StoryWrapper>
      );
    },
  ],
  args: {
    orders: [
      {
        "orderId": 1,
        "orderProducts": [
          {
            "id": 24,
            "name": "친환경 실링 용기",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 3,
            "price": 60000,
            "totalPrice": 180000
          },
          {
            "id": 25,
            "name": "친환경 실링 용기222",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 1,
            "price": 50000,
            "totalPrice": 50000
          }
        ]
      },
      {
        "orderId": 2,
          "orderProducts": [
          {
            "id": 33,
            "name": "아이템 2",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 3,
            "price": 1000,
            "totalPrice": 3000
          },
          {
            "id": 55,
            "name": "아이템 5",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 2,
            "price": 14000,
            "totalPrice": 28000
          }
        ]
      }
    ]
  },
  argTypes: {
    orders: {
      description: '주문한 아이템을 보여줍니다.',
    },
  },
} satisfies Meta<typeof OrderListComponent>;

export default meta;

export const OrderList = (args: any) => {
  return (
    <>
      <OrderListComponent orders={args} />
    </>
  );
};

const S = {
  StoryWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 10vw);
  `,

  Wrapper: styled.div`
    width: 50%;
    height: auto;
  `,
};
