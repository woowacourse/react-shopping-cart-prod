import { css, styled } from 'styled-components';
import { Cart } from '../../types';
import Price from '../Price';

const OrderItem = ({ imageUrl, name, price, quantity }: Cart) => {
  return (
    <S.Wrapper tabIndex={0}>
      <S.Image src={`${imageUrl}`} alt={name} />
      <div>
        <S.Name>{name}</S.Name>
        <S.Detail>
          <Price price={price} css={textStyle} />
          <span>&nbsp;/&nbsp;수량&nbsp;:&nbsp;{quantity}개</span>
        </S.Detail>
      </div>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.li`
    display: flex;
    padding: 38px 26px;
    border: 1px solid var(--gray-color-300);
  `,

  Name: styled.h3`
    font-size: 18px;
  `,

  Image: styled.img`
    width: 140px;
    margin-right: 34px;

    @media (max-width: 548px) {
      margin-right: 8px;
    }

    @media (max-width: 420px) {
      width: 100%;
      margin: 10px 0 0;
    }
  `,

  Detail: styled.div`
    display: flex;
    margin-top: 32px;
    font-size: 17px;
    color: #888;

    @media (max-width: 1270px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,
};

const textStyle = css`
  color: #888;
`;

export default OrderItem;
