import { OrderDetailInfo } from '../../types';
import OrderItemDetail from './OrderItemDetail';
import * as S from './styles/OrderItemDetailList.styles';

export default function OrderItemDetailList(props: OrderDetailInfo) {
  const { orderId, items } = props;

  return (
    <S.Wrapper>
      <S.OrderDetailIdTitle>
        <p>주문번호 : {orderId}</p>
      </S.OrderDetailIdTitle>
      <S.OrderItemDetailWrapper>
        {items.map((item, idx) => (
          <OrderItemDetail key={idx} {...item} />
        ))}
      </S.OrderItemDetailWrapper>
    </S.Wrapper>
  );
}
