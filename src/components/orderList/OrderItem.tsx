import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { Cart } from '../../types';
import Price from '../Price';

const OrderItem = ({ imageUrl, name, price, quantity }: Cart) => {
  const location = useLocation().pathname;

  return (
    <S.Wrapper tabIndex={0}>
      <S.Image src={`${imageUrl}`} alt={name} />
      <div>
        <S.Name>
          {name}
          {location === ROUTE_PATH.ORDER_LIST_PAGE && <span>외 {2}개의 상품</span>}
        </S.Name>
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

    & span {
      margin-left: 4px;
    }
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
