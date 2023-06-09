import type { OrderType } from '../../types/product';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import OrderItem from './OrderItem';
import { formatDateTime } from '../../utils/timeFormat';

interface OrderItemListProps {
  order: OrderType;
  isDetailed: boolean;
}

const OrderItemList = ({ order, isDetailed }: OrderItemListProps) => {
  const { orderId, orderDateTime, orderItems, totalPrice } = order;

  return (
    <Wrapper>
      <OrderContent key={orderId}>
        <OrderInfo>
          <div>
            <p> 주문번호: {orderId}</p>
            <p> 주문일: {formatDateTime(orderDateTime)}</p>
          </div>
          <Link to={`/order/${orderId}`}>
            <DetailButton>상세보기 &#62;</DetailButton>
          </Link>
        </OrderInfo>
        <div>
          {orderItems.map((item) => (
            <OrderItem orderProduct={item} />
          ))}
        </div>
      </OrderContent>
      {isDetailed && (
        <PaymentInfoWrapper>
          <Title>결제금액 정보</Title>
          <Content>
            <PaymentInfo>
              <dt>총 결제금액</dt>
              <dd>{totalPrice.toLocaleString('KR')}원</dd>
            </PaymentInfo>
          </Content>
        </PaymentInfoWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const OrderContent = styled.div`
  width: 100%;
  margin-bottom: 70px;
  border: 1px solid #aaaaaa;
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

  letter-spacing: 0.5px;

  @media (max-width: 678px) {
    font-size: 15px;
  }
`;

const DetailButton = styled.button`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;
  cursor: pointer;

  @media (max-width: 678px) {
    font-size: 15px;
  }
`;

const PaymentInfoWrapper = styled.div`
  width: 40%;

  border: 1px solid #aaaaaa;

  @media (max-width: 678px) {
    width: 60%;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 92px;

  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;

  padding: 33px 30px;

  background-color: #f6f6f6;
  border-bottom: 1px solid #aaaaaa;

  @media (max-width: 678px) {
    font-size: 18px;
    height: 60px;

    padding: 17px 30px;
  }
`;

const PaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;

  @media (max-width: 678px) {
    font-size: 13px;
  }
`;

const Content = styled.div`
  padding: 33px 31px;
`;

export default OrderItemList;
