import { Meta } from '@storybook/react';
import CartListItemComponent from '../../components/cart/CartListItem';
import { styled } from 'styled-components';
import Checkbox from '../../components/@common/Checkbox';

const meta = {
  component: CartListItemComponent,
  title: 'Components/CartListItem',
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
    item: {
      id: 1,
      quantity: 3,
      product: {
        id: 1,
        name: 'PET보틀-정사각(370ml)',
        price: 41000,
        imageUrl: `https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300`,
      },
    },
  },
  argTypes: {
    item: {
      description: '카트에 담긴 아이템을 보여줍니다.',
    },
  },
} satisfies Meta<typeof CartListItemComponent>;

export default meta;

export const CartListItem = (args: any) => {
  return (
    <>
      <Checkbox onChange={() => {}} isChecked={true} />
      <CartListItemComponent item={args.item} setCheckItems={() => {}} />
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
