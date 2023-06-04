import { S } from './OrderCompleteItem.styles';
import { OrderItem } from '../../../types';

type Props = {
  order: OrderItem;
  id: number;
};

const OrderCompleteItem = ({ order, id }: Props) => {
  const renderPaymentItem = (label: string, value: string) => {
    return (
      <div>
        <span>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <>
      <S.Title>고객님의 주문이 완료되었습니다.</S.Title>
      <S.Wrapper>
        <S.PaymentWrapper>
          {renderPaymentItem('주문번호', order.orderId.toString())}
          {renderPaymentItem('주문일자', order.createdAt)}
          {renderPaymentItem('결제금액', `${order.orderTotalPrice}원`)}
        </S.PaymentWrapper>
      </S.Wrapper>
    </>
  );
};

export default OrderCompleteItem;
