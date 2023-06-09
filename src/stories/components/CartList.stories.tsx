import type { Meta, StoryObj } from '@storybook/react';
import CartList from '../../components/cart/CartList';
import { CartListWrapper } from '../../style/ContentLayout';
import { styled } from 'styled-components';
import Header from '../../components/Header';
import { within } from '@testing-library/react';
import { setDataInLocalStorage } from '../../utils/localStorage';
import { expect } from '@storybook/jest';
import userEvent from '@testing-library/user-event';
import CartPage from '../../pages/CartPage';

const mockData = [
  {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
  {
    id: 2,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
  },
  {
    id: 3,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/fbe1660a-20f4-4077-8ce7-d8926c7b4e6d.jpg?h=300&w=300',
  },
  {
    id: 4,
    name: 'PET보틀-납작(450ml)',
    price: 39900,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6adcd3f3-25a3-4038-82a4-322eb72ec281.jpg?h=300&w=300',
  },
];

const meta = {
  title: 'Pages/cart/CartPage',
  component: CartPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <S.Wrapper>
          <Story />
        </S.Wrapper>
      );
    },
  ],
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  decorators: [
    (Story) => {
      return (
        <>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>

          <Story />
        </>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    window.localStorage.clear();

    setDataInLocalStorage('cart', mockData);

    const canvas = within(canvasElement);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const badge = document.querySelector('#cart-badge');
    expect(badge).toContainHTML('3')

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const totalPrice = document.querySelector('#total-price')!;
    expect(totalPrice).toHaveTextContent('총 주문금액316,200원')
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const checkedAllItems = document.querySelector('#check-all-items')!;
    userEvent.click(checkedAllItems);
    expect(totalPrice).toHaveTextContent('총 주문금액3,000원')
    
    // const removeSelectedItems = document.querySelector('#remove-checked-items')!;
    // await userEvent.click(removeSelectedItems);
    // await userEvent.click( screen.getByRole('button', { name: '확인' }));
    // expect(badge).toContainHTML('0')

  },
};

const S = {
  Wrapper: styled(CartListWrapper)`
    width: calc(100vw - 5vw);
  `,
};

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
