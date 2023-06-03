import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_PATH } from '@router/router';
import Layout from '@components/layout/Layout';
import OrderHeader from '@components/orders/OrderHeader';
import OrderItem from '@components/orders/OrderItemList/OrderItem';
import OrderPaymentAmount from '@components/orders/OrderPaymentAmount';
import { MOCK_ORDER_LIST } from '@mocks/handlers';
import * as S from './OrderDetail.style';

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = MOCK_ORDER_LIST.find((orderItem) => orderItem.id === Number(orderId));

  if (!order) {
    navigate(ROUTER_PATH.HOME);
    return <div>존재하지 않는 주문 내역입니다.</div>;
  }

  return (
    <Layout>
      <OrderHeader text="주문 내역 상세" />
      <OrderItem order={order} isDetail={false} />
      <S.OrderPaymentAmountWrapper>
        <div />
        <OrderPaymentAmount {...order} />
      </S.OrderPaymentAmountWrapper>
    </Layout>
  );
}

export default OrderDetail;
