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
    order: {
      id: 1,
      order: [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: 'PET보틀-정사각(370ml)',
            price: 41000,
            imageUrl: `https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300`,
          },
        },
        {
          id: 2,
          quantity: 1,
          product: {
            id: 2,
            name: 'PET보틀-밀크티(370ml)',
            price: 73400,
            imageUrl:
              'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
          },
        },
      ],
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
