import { useRecoilValue } from 'recoil';
import { detailOrderSelector } from '../../atoms/orders';
import * as S from './OrderDetail.styles';
import OrderProductItem from '../../components/OrderPage/OrderProductItem';

interface OrderDetailProps {
  orderId: number;
}
const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const order = useRecoilValue(detailOrderSelector(orderId));

  return (
    <>
      <S.OrderContainer>
        <S.Header>
          <span>주문번호: {orderId}</span>
        </S.Header>
        <S.List>
          {order.orderItems.map((item) => (
            <OrderProductItem key={item.orderItemId} {...item} />
          ))}
        </S.List>
      </S.OrderContainer>
      <S.TotalPriceContainer>
        <S.Header>결제금액 정보</S.Header>
        <S.TotalPrice>
          <span>총 결제금액</span>
          <span>{order.totalPrice.toLocaleString()}원</span>
        </S.TotalPrice>
      </S.TotalPriceContainer>
    </>
  );
};

export default OrderDetail;
