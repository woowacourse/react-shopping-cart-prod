import { OrderItemType } from '@Types/index';

import * as S from './style';
import OrderProduct from '../OrderProduct';

function OrderItem({ date, price, cartItems, order }: OrderItemType & { order: number }) {
  console.log(date, price, cartItems, order);
  return (
    <S.Container>
      <S.OrderInfo>
        <S.OrderNumber>주문번호 : {order}</S.OrderNumber>
        <S.MoveDetailPage>상세보기 ⟩</S.MoveDetailPage>
      </S.OrderInfo>
      <S.OrderItems>
        {cartItems.map((cartItem) => {
          return <OrderProduct key={cartItem.id} {...cartItem} />;
        })}
      </S.OrderItems>
    </S.Container>
  );
}

export default OrderItem;
