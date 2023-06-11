import { Meta } from '@storybook/react';
import { css, styled } from 'styled-components';
import OrderComponent from '../../components/cart/Order';
import Button from '../../components/common/Button';
import Price from '../../components/Price';
import { DELIVERY_FEE } from '../../constants';

const meta = {
  component: OrderComponent,
  title: 'Components/Cart/Order',
  tags: ['autodocs'],
  args: {
    totalPrice: 10000,
    priceDiscount: 3000,
  },
  argTypes: {
    totalPrice: {
      controls: {
        type: 'number',
      },
      description:
        '총 상품금액을 입력하면 총 상품금액과 총 배송비를 합한 뒤 할인 금액을 제한 금액이 `총 주문금액`으로 나옵니다.',
    },
    priceDiscount: {
      controls: {
        type: 'number',
      },
      description: '할인 금액을 변경할 수 있습니다.',
    },
  },
} satisfies Meta<typeof OrderComponent>;

export default meta;

export const Order = (args: { totalPrice: number; priceDiscount: number }) => {
  return (
    <S.Wrapper>
      <S.Title>결제예상금액</S.Title>
      <S.List>
        <Price value={args.totalPrice} tag='li' description='총 상품가격' />
        <Price value={DELIVERY_FEE} tag='li' description='총 배송비' />
        <Price value={args.priceDiscount} tag='li' description='할인 쿠폰' />
        <Price
          value={args.totalPrice + DELIVERY_FEE - args.priceDiscount}
          tag='li'
          description='총 주문금액'
        />
      </S.List>
      <Button css={orderButtonStyle}>주문하기</Button>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    max-width: 448px;
    max-height: 410px;
    margin-top: 40px;
    padding-bottom: 38px;
    border: 1px solid var(--gray-color-100);
  `,

  Title: styled.h3`
    padding: 24px 30px;
    margin-bottom: 44px;
    border-bottom: 3px solid var(--gray-color-100);
    font-size: 20px;

    @media (max-width: 548px) {
      margin-bottom: 32px;
      font-size: 18px;
    }
  `,

  List: styled.ul`
    & > li {
      display: flex;
      justify-content: space-between;
      margin: 0 30px 20px;
      font-size: 18px;
      font-weight: 600;

      & span {
        font-weight: 500;
      }

      &:last-child {
        margin: 42px 30px 54px;
      }

      @media (max-width: 548px) {
        flex-direction: column;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        line-height: 1.4;

        &:last-child {
          margin: 32px 30px 34px;
        }
      }
    }
  `,
};

const orderButtonStyle = css`
  width: calc(100% - 60px);
  padding: 26px 120px;
  margin: 0 30px;
  background: var(--text-color);
  font-size: 22px;
  color: var(--white-color);

  @media (max-width: 548px) {
    padding: 20px 10px;
    font-size: 16px;
  }
`;
