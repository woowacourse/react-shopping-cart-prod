import React, {useEffect} from 'react';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';

import OrderItem from 'component/OrderItem';

import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/OrderListPage/style';

import useFetch from 'hook/useFetch';
import {useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import {PATH} from 'constant';

export default function OrderListPage() {
  const orderList = useFetch('get');

  const accessToken = useSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    orderList.fetch({
      API_URL: process.env.REACT_APP_ORDER_LIST_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, []);

  return (
    <S.Layout>
      <S.HeaderSpan>주문/결제</S.HeaderSpan>
      <S.ProductTable>
        <S.ProductInfoContainer>
          <S.ProductListContainer>
            <ErrorPendingBoundary
              error={orderList.error}
              pending={orderList.pending}
              fallback={<NotFoundPage>에러가 발생했어요.</NotFoundPage>}
            >
              {orderList.data &&
                orderList.data.map(({orderId, order}) => {
                  return (
                    <S.OrderTable key={orderId}>
                      <S.OrderTableHeader>
                        <S.OrderNumber>주문번호: {orderId}</S.OrderNumber>
                        <Link to={PATH.ORDER_DETAIL}>
                          <S.OrderNumber>상세보기 &gt;</S.OrderNumber>
                        </Link>
                      </S.OrderTableHeader>
                      {order.map((productInfo) => (
                        <S.OrderItemContainer key={productInfo.id}>
                          <S.OrderItemBox>
                            <OrderItem productInfo={productInfo} showButton={true} />
                          </S.OrderItemBox>
                        </S.OrderItemContainer>
                      ))}
                    </S.OrderTable>
                  );
                })}
            </ErrorPendingBoundary>
          </S.ProductListContainer>
        </S.ProductInfoContainer>
      </S.ProductTable>
    </S.Layout>
  );
}
