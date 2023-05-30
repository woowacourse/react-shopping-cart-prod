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
          <span>&nbsp;/&nbsp;수량&nbsp;{quantity}개</span>
        </S.Detail>
      </div>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.li`
    display: flex;
    padding: 38px 0;
  `,

  Name: styled.h3`
    font-size: 17px;
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
    font-size: 16px;
    color: #888;
    font-size: 15px;

    @media (max-width: 1270px) {
      font-size: 15px;
    }
  `,
};

const textStyle = css`
  font-size: 15px;
  color: #888;
`;

export default OrderItem;
