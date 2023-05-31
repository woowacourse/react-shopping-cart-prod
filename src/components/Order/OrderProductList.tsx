import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import OrderProductItem from './OrderProductItem';
import { orderAtom } from '../../recoil/orderProductData';

const OrderProductList = () => {
  const orders = useRecoilValue(orderAtom);
  console.log(orders);

  if (orders.length === 0) return <EmptyOrder>장바구니가 비었어요</EmptyOrder>;

  return (
    <Wrapper>
      {orders &&
        orders.map((order) => (
          <OrderContent key={order.orderId}>
            <OrderInfo>
              <p>주문번호: {order.orderId}</p>
              <DetailButton>상세보기 &#62;</DetailButton>
            </OrderInfo>
            <ContentListWrapper>
              {order.orderItems.map((item, index) => (
                <OrderProductItem key={index} orderProduct={item} />
              ))}
            </ContentListWrapper>
          </OrderContent>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const OrderInfo = styled.div`
  width: 100%;
  height: 92px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f6f6f6;

  padding: 40px;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  /* or 120% */

  letter-spacing: 0.5px;
`;

const OrderContent = styled.div`
  margin-bottom: 70px;
  border: 1px solid #aaaaaa;
`;

const DetailButton = styled.button`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  /* or 120% */

  letter-spacing: 0.5px;
  cursor: pointer;
`;

const ContentListWrapper = styled.div``;

const EmptyOrder = styled.p`
  margin: 40px 0;
`;

export default OrderProductList;
