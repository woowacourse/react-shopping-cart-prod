import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { OrderListItem } from '../../types';
import Price from '../Price';

const OrderItem = ({
  imageUrl,
  name,
  totalPrice,
  quantity,
  orderedProductCount,
}: OrderListItem) => {
  const location = useLocation().pathname;

  return (
    <S.Wrapper tabIndex={0}>
      <S.Image src={`${imageUrl}`} alt={name} loading='lazy' />
      <div>
        <S.Name>
          {name}
          {location === ROUTE_PATH.ORDER_LIST_PAGE && orderedProductCount > 1 && (
            <span>외 {orderedProductCount - 1}개의 상품</span>
          )}
        </S.Name>
        <S.Detail>
          <Price price={totalPrice} css={textStyle} />
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
