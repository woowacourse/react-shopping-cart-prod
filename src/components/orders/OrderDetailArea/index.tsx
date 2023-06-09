import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ROUTER_PATH } from '@router/router';
import { orderDetailState } from '@recoil/order/orderDetailState';
import OrderItem from '../OrderItemList/OrderItem';
import OrderPaymentAmount from '../OrderPaymentAmount';
import * as S from './OrderDetailArea.style';

interface OrderDetailAreaProps {
  orderId: number;
}

function OrderDetailArea({ orderId }: OrderDetailAreaProps) {
  const navigate = useNavigate();

  const order = useRecoilValue(orderDetailState(orderId));

  if (!order) {
    navigate(ROUTER_PATH.HOME);
  }

  return (
    <div>
      <OrderItem order={order} isVisibleDetail={false} />
      <S.OrderPaymentAmountWrapper>
        <div />
        <OrderPaymentAmount
          deliveryFee={order.deliveryFee}
          discountPrice={order.discountPrice}
          totalItemsPrice={order.totalItemsPrice}
        />
      </S.OrderPaymentAmountWrapper>
    </div>
  );
}

export default OrderDetailArea;
