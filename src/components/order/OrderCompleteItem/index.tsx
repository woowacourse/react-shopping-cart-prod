import { S } from './OrderCompleteItem.styles';
import { OrderItem } from '../../../types';

type Props = {
  order: OrderItem;
  id: number;
};

const OrderCompleteItem = ({ order, id }: Props) => {
  return (
    <>
      <S.Title>고객님의 주문이 완료되었습니다.</S.Title>
      <S.Wrapper>
        <S.PaymentWrapper>
          <div>
            <span>주문번호</span>
            <span>{`${order.orderId}`}</span>
          </div>
          <div>
            <span>주문일자</span>
            <span>{`${order.createdAt}`}</span>
          </div>
          <div>
            <span>결제금액</span>
            <span>{`${order.orderTotalPrice}원`}</span>
          </div>
        </S.PaymentWrapper>
      </S.Wrapper>
    </>
  );
};

export default OrderCompleteItem;
