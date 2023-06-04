import { DELIVERY_FEE } from '../../../constants';
import { OrderItem } from '../../../types';
import { S } from './OrderDetailItem.styles';
type Props = {
  orderDetail: OrderItem;
};

const OrderDetailItem = ({ orderDetail }: Props) => {
  const totalProductPrice =
    orderDetail.orderTotalPrice - DELIVERY_FEE(orderDetail.orderTotalPrice) + orderDetail.usedPoint;
  const deliveryFee = DELIVERY_FEE(orderDetail.orderTotalPrice);
  return (
    <S.Wrapper>
      <S.InfoWrapper>
        <span>주문 번호</span>
        <span> {orderDetail.orderId}</span>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <span>주문 일자</span>
        <span> {orderDetail.createdAt}</span>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <span>총 상품금액</span>
        <span>{`${totalProductPrice.toLocaleString()}원`}</span>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <span>배송비</span>
        <span>{`${deliveryFee.toLocaleString()}원`}</span>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <span>사용한 포인트</span>
        <span>{`-${orderDetail.usedPoint.toLocaleString()}원`}</span>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <span>총 결제금액</span>
        <span>{`${orderDetail.orderTotalPrice.toLocaleString()}원`}</span>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

export default OrderDetailItem;
