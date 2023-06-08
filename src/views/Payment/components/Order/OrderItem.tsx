import { OrderType } from 'types/OrderType';
import { VscChevronRight } from 'react-icons/vsc';
import { OrderItemList } from '../OrderItemList';
import { useNavigate } from 'react-router-dom';
import * as S from './OrderItem.style'

function OrderItem({ order, hasDetail }: { order: OrderType; hasDetail?: boolean }) {
  const navigate = useNavigate();
  return (
    <S.OrderContainer>
      <S.WrapperTitle>
        <S.OrderNumber>주문번호: {order.id}</S.OrderNumber>

        {hasDetail && (
          <S.DetailItemButton>
            <VscChevronRight />
            <S.DetailItemSpan
              onClick={() => {
                navigate(`/order/${order.id}`);
              }}
            >
              상세보기
            </S.DetailItemSpan>
          </S.DetailItemButton>
        )}
      </S.WrapperTitle>
      <OrderItemList orderItems={order.orderItems} />
    </S.OrderContainer>
  );
}

export default OrderItem;

