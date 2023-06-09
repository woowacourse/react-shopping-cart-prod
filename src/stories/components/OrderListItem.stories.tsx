import { Meta } from '@storybook/react';
import OrderListItemComponent from '../../components/order/OrderListItem';
import { styled } from 'styled-components';

const meta = {
  component: OrderListItemComponent,
  title: 'Components/OrderListItem',
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
    order: 
      {
        "orderId": 1,
        "orderProducts": [
          {
            "productId": 24,
            "name": "친환경 실링 용기",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 3,
            "price": 60000,
            "totalPrice": 180000
          },
          {
            "productId": 25,
            "name": "친환경 실링 용기222",
            "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300",
            "quantity": 1,
            "price": 50000,
            "totalPrice": 50000
          }
        ],
        "orderTotalPrice": 31000,
        "usedPoint": 200,
        "createdAt": "2023-05-26 21:00:01"
      },
     
  },
  argTypes: {
    order: {
      description: '주문한 아이템을 보여줍니다.',
    },
  },
} satisfies Meta<typeof OrderListItemComponent>;

export default meta;

export const CartListItem = (args: any) => {
  return (
    <>
      <OrderListItemComponent order={args.order} />
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
