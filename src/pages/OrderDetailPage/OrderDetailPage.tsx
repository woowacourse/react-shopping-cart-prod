import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetOrderDetail from '../../hooks/requests/useGetOrderDetail.ts';
import { useEffect } from 'react';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';
import OrderList from '../../components/@common/OrderList/OrderList.tsx';
import ROUTES from '../../constants/ROUTES.ts';
import * as Styled from './OrderDetailPage.styles.tsx';

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId } = useParams();
  const { data, fetchOrderDetail } = useGetOrderDetail(orderId as string);

  const handleOrderListButton = () => {
    navigate(ROUTES.ORDER);
  };

  const handleProductListButton = () => {
    navigate(ROUTES.LIST);
  };

  useEffect(() => {
    if (!state && orderId) {
      fetchOrderDetail({});
    }
  }, [state, orderId]);

  const orderData: OrderResponse = state?.makeOrder ?? data;

  return (
    <>
      {orderData && (
        <Styled.OrderDetailPageWrapper>
          <Styled.OrderDetailPageContent>
            <Styled.OrderDetailPageTitle>주문 내역 상세</Styled.OrderDetailPageTitle>
            <Styled.OrderDetailPageTitleBorder />

            <OrderList orderData={orderData} />

            <Styled.PriceBoxWrapper>
              <Styled.PriceBoxContent>
                <Styled.PriceBoxHeader>결제금액 정보</Styled.PriceBoxHeader>
                <Styled.PriceInnerContent>
                  <li>상품금액: {orderData.productPrice.toLocaleString()}원</li>
                  <li>ㄴ할인금액: {orderData.discountPrice.toLocaleString()}원</li>
                  <li>배달금액: {orderData.deliveryFee.toLocaleString()}원</li>
                  <li>총 결제: {orderData.totalPrice.toLocaleString()}원</li>
                </Styled.PriceInnerContent>
              </Styled.PriceBoxContent>
            </Styled.PriceBoxWrapper>

            <div>
              <Styled.DetailPageButton onClick={handleOrderListButton}>주문 목록</Styled.DetailPageButton>
              <Styled.DetailPageButton onClick={handleProductListButton}>홈으로</Styled.DetailPageButton>
            </div>
          </Styled.OrderDetailPageContent>
        </Styled.OrderDetailPageWrapper>
      )}
    </>
  );
};

export default OrderDetailPage;
