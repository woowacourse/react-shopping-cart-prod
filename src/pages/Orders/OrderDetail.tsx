import Layout from '@components/layout/Layout';
import OrderHeader from '@components/orders/OrderHeader';
import OrderItem from '@components/orders/OrderItemList/OrderItem';
import OrderPaymentAmount from '@components/orders/OrderPaymentAmount';
import { OrderType } from '@type/orderType';
import * as S from './OrderDetail.style';

interface OrderDetailProps {
  order: OrderType;
}

function OrderDetail({ order }: OrderDetailProps) {
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
