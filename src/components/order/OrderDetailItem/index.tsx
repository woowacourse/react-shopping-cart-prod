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

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  const renderDetailItem = (label: string, value: string) => {
    return (
      <S.InfoWrapper>
        <span>{label}</span>
        <span>{value}</span>
      </S.InfoWrapper>
    );
  };

  return (
    <S.Wrapper>
      {renderDetailItem('주문 번호', orderDetail.orderId.toString())}
      {renderDetailItem('주문 일자', orderDetail.createdAt)}
      {renderDetailItem('총 상품금액', formatPrice(totalProductPrice))}
      {renderDetailItem('배송비', formatPrice(deliveryFee))}
      {renderDetailItem('사용한 포인트', `- ${formatPrice(orderDetail.usedPoint)}`)}
      {renderDetailItem('총 결제금액', formatPrice(orderDetail.orderTotalPrice))}
    </S.Wrapper>
  );
};

export default OrderDetailItem;
