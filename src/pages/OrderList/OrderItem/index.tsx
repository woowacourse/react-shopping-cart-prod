import { OrderItemType } from '@Types/index';

import dateHelper from '@Utils/dateHelper';

import * as S from './style';
import OrderProduct from '../OrderProduct';

function OrderItem({ date, cartItems }: OrderItemType) {
  const displayCartItems = () => {
    if (cartItems.length < 3) return cartItems;

    return cartItems.slice(0, 2);
  };

  return (
    <S.Container>
      <S.OrderInfo>
        <S.OrderDate>{dateHelper.changeLocalDate(date)}</S.OrderDate>
        <S.MoveDetailPage>상세보기 ⟩</S.MoveDetailPage>
      </S.OrderInfo>
      <S.OrderItems>
        {displayCartItems().map((cartItem) => {
          return <OrderProduct key={cartItem.id} {...cartItem} />;
        })}
      </S.OrderItems>
    </S.Container>
  );
}

export default OrderItem;
