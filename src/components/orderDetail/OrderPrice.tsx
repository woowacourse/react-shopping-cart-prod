import { styled } from 'styled-components';
import Price from '../Price';

interface Props {
  totalPrice: number;
}

const OrderPrice = ({ totalPrice }: Props) => {
  return (
    <S.Wrapper>
      <S.Title>결제금액 정보</S.Title>
      <li>
        총 결제금액 <Price price={totalPrice} />
      </li>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.ul`
    margin: 0 0 100px auto;
    width: 40%;
    font-weight: 700;
    color: var(--text-color);

    & li {
      display: flex;
      justify-content: space-between;
      padding: 30px 40px 32px;
      font-size: 20px;
      border: 1px solid var(--gray-color-300);
    }
  `,

  Title: styled.li`
    background: #f6f6f6;
  `,
};

export default OrderPrice;
