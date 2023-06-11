import { styled } from 'styled-components';
import Nothing from '../components/common/Nothing';
import Title from '../components/common/Title';
import OrderDetail from '../components/orderDetail/OrderDetail';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';
import { IMAGE_PATH } from '../constants';
import { useGetOrderItemDetail } from '../hooks/useGetOrderItemDetail';

const OrderDetailPage = () => {
  const orderItemDetail = useGetOrderItemDetail();

  if (!orderItemDetail) {
    return (
      <Nothing
        src={IMAGE_PATH.EMPTY_ORDER_LIST}
        alt='해당 주문 번호의 주문 상세 내역이 존재하지 않습니다'
        description='해당 주문 번호의 주문 상세 내역이 존재하지 않습니다'
      />
    );
  }

  const { totalPrice, deliveryFee, coupon, totalPayments, orderStatus } = orderItemDetail;

  return (
    <MainLayout>
      <>
        <Title value='주문 내역 상세' />
        <S.Wrapper>
          <OrderItemList orderList={orderItemDetail} tag='div' />
          <OrderDetail
            totalPrice={totalPrice}
            deliveryFee={deliveryFee}
            coupon={coupon}
            totalPayments={totalPayments}
            orderStatus={orderStatus}
          />
        </S.Wrapper>
      </>
    </MainLayout>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;

    @media (max-width: 1270px) {
      flex-direction: column;
    }

    @media (max-width: 548px) {
      & img {
        margin-right: 28px;
      }
    }
  `,
};

export default OrderDetailPage;
