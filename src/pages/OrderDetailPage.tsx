import { useLocation } from 'react-router-dom';
import OrderListItem from '../components/order/OrderListItem';
import { useRecoilValue } from 'recoil';
import { serverState } from '../store/ServerState';
import useGet from '../hooks/useGet';
import { OrderItem } from '../types';
import { ORDER_BASE_URL } from '../constants/url';
import { OrderDetailWrapper, OrderListWrapper, OrderWrapper } from '../style/ContentLayout';
import { Title } from '../style/commonStyle';
import OrderDetailItem from '../components/order/OrderDetailItem';

const OrderDetailPage = () => {
  const serverUrl = useRecoilValue(serverState);
  const location = useLocation();
  const id = location.state.id;

  const { data: orderDetail, isLoading } = useGet<OrderItem>(`${serverUrl}${ORDER_BASE_URL}/${id}`);

  return (
    <OrderListWrapper>
      <Title>주문 상세 내역</Title>
      <OrderDetailWrapper>
        {isLoading ? null : (
          <>
            <OrderWrapper>
              {orderDetail ? <OrderListItem order={orderDetail} isList={true} /> : null}
            </OrderWrapper>
            <div>{orderDetail ? <OrderDetailItem orderDetail={orderDetail} /> : null}</div>
          </>
        )}
      </OrderDetailWrapper>
    </OrderListWrapper>
  );
};

export default OrderDetailPage;
