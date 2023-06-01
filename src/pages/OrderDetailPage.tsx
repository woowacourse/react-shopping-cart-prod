import { useLocation } from 'react-router-dom';
import OrderListItem from '../components/order/OrderListItem';
import { useRecoilValue } from 'recoil';
import { serverState } from '../store/ServerState';
import useGet from '../hooks/useGet';
import { OrderDetail } from '../types';
import { ORDER_BASE_URL } from '../constants/url';
import { OrderListWrapper, OrderWrapper } from '../style/ContentLayout';
import { Title } from '../style/commonStyle';

const OrderDetailPage = () => {
  const serverUrl = useRecoilValue(serverState);
  const location = useLocation();
  const id = location.state.id;

  const { data: orderDetail, isLoading } = useGet<OrderDetail>(
    `${serverUrl}${ORDER_BASE_URL}/${id}`,
  );

  // TODO: ui 분리
  return (
    <OrderListWrapper>
      <Title>주문 목록</Title>
      {isLoading ? null : (
        <>
          <OrderWrapper>
            {orderDetail ? <OrderListItem order={orderDetail} buttonHide={true} /> : null}
          </OrderWrapper>
          <div>
            {orderDetail ? (
              <>
                <span>총 결제금액</span>
                <span>
                  {orderDetail?.orderProducts.reduce((acc, item) => {
                    return acc + item.totalPrice;
                  }, 0)}
                  원
                </span>
                <span>주문 시각</span>
                <span> {orderDetail.createdAt}</span>
                <span>사용한 포인트</span>
                <span>{`${orderDetail.usedPoint}원`}</span>
              </>
            ) : null}
          </div>
        </>
      )}
    </OrderListWrapper>
  );
};

export default OrderDetailPage;
