import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { ORDER_STATUS, ROUTE_PATH } from '../../constants';
import { ORDER_URL } from '../../constants/url';
import { useCancelOrder } from '../../hooks/useCancelOrder';
import { useFetchData } from '../../hooks/useFetchData';
import { serverState } from '../../recoil';
import { OrderListItem } from '../../types';
import Button from '../common/Button';
import Price from '../Price';

const OrderItem = ({
  orderId,
  imageUrl,
  name,
  totalPrice,
  quantity,
  orderedProductCount,
  totalPayments,
  orderStatus,
}: OrderListItem) => {
  const location = useLocation().pathname;

  const { changedStatus, handleOrderCancel } = useCancelOrder({ orderStatus, orderId });

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
              <Price value={totalPrice / quantity} css={textStyle} />
              <S.TotalDetail>
                <Price value={totalPrice} css={textStyle} />
                <span>&nbsp;/ 수량 {quantity}개</span>
              </S.TotalDetail>
            </>
          ) : (
            <>
              <Price value={totalPayments} css={totalPaymentStyle} />
              <S.OrderStatus>{changedStatus}</S.OrderStatus>
            </>
          )}
        </S.Detail>
      </section>
      {location === ROUTE_PATH.ORDER_LIST_PAGE && changedStatus === ORDER_STATUS.PAID && (
        <Button onClick={handleOrderCancel} css={cancelButtonStyle}>
          {ORDER_STATUS.CANCEL}
        </Button>
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.li`
    display: flex;
    padding: 38px 0 14px;

    @media (max-width: 420px) {
      flex-direction: column;
    }

    & section {
      @media (max-width: 420px) {
        text-align: center;
      }
    }
  `,

  Name: styled.h3`
    display: -webkit-box;
    height: 18px;
    margin-top: 6px;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    & span {
      margin-left: 4px;
    }

    @media (max-width: 420px) {
      margin-top: 16px;
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
      margin: 16px 0 0;
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

    @media (max-width: 420px) {
      row-gap: 0;
    }
  `,

  TotalDetail: styled.div`
    display: flex;
    margin-top: 32px;

    @media (max-width: 420px) {
      margin: 32px auto 0;
      text-align: center;
    }
  `,

  OrderStatus: styled.p`
    margin-top: 36px;
    color: var(--red-color);

    @media (max-width: 420px) {
      margin-top: 40px;
    }
  `,
};

const textStyle = css`
  font-size: 15px;
  color: #888;
`;

const totalPaymentStyle = css`
  padding-top: 12px;
`;

const cancelButtonStyle = css`
  align-self: end;
  margin-left: auto;
  padding: 6px 12px 7px;
  font-size: 15px;
  color: var(--text-color);
  border: 1px solid var(--gray-color-100);

  @media (max-width: 768px) {
    max-width: 55px;
    min-width: 45px;
  }

  @media (max-width: 420px) {
    margin: 42px auto 0;
    max-width: initial;
    min-width: initial;
  }
`;

export default OrderItem;
