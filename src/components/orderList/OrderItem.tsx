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
  totalPayments,
  orderStatus,
}: OrderListItem) => {
  const location = useLocation().pathname;

  const title =
    location === ROUTE_PATH.ORDER_LIST_PAGE && orderedProductCount > 1
      ? `${name} 외 ${orderedProductCount - 1}개의 상품`
      : name;

  return (
    <S.Wrapper tabIndex={0}>
      <S.Image src={`${imageUrl}`} alt={name} loading='lazy' />
      <section>
        <S.Name title={title}>{title}</S.Name>
        <S.Detail>
          {location !== ROUTE_PATH.ORDER_LIST_PAGE ? (
            <>
              <Price price={totalPrice / quantity} css={textStyle} />
              <S.TotalDetail>
                <Price price={totalPrice} css={textStyle} />
                <span>&nbsp;/&nbsp;수량&nbsp;{quantity}개</span>
              </S.TotalDetail>
            </>
          ) : (
            <>
              <Price price={totalPayments} css={totalPaymentStyle} />
              <S.OrderStatus>{orderStatus}</S.OrderStatus>
            </>
          )}
        </S.Detail>
      </section>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.li`
    display: flex;
    padding: 38px 0 14px;
  `,

  Name: styled.h3`
    display: -webkit-box;
    margin-top: 6px;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

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
    flex-direction: column;
    row-gap: 14px;
    font-size: 16px;
    color: #888;
    font-size: 15px;

    & > p:first-child {
      margin-top: 12px;
      color: var(--text-color);
    }

    @media (max-width: 1270px) {
      font-size: 15px;
    }
  `,

  TotalDetail: styled.div`
    display: flex;
    margin-top: 32px;
  `,

  OrderStatus: styled.p`
    margin-top: 36px;
    color: var(--red-color);
  `,
};

const textStyle = css`
  font-size: 15px;
  color: #888;
`;

const totalPaymentStyle = css`
  padding-top: 12px;
`;

export default OrderItem;
