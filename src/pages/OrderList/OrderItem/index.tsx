import { useNavigate } from 'react-router-dom';

import { OrderItemType } from '@Types/index';

import dateHelper from '@Utils/dateHelper';

import * as S from './style';
import OrderAmount from '../OrderAmount';
import OrderProduct from '../OrderProduct';

function OrderItem({ id, date, cartItems, page, price }: OrderItemType & { page?: 'detail' }) {
  const navigate = useNavigate();

  const moveOrderDetail = () => {
    navigate(`/order-list/${id}`);
  };

  const displayCartItems = () => {
    if (page === 'detail') return cartItems;
    if (cartItems.length < 3) return cartItems;

    return cartItems.slice(0, 2);
  };

  return (
    <>
      <S.Container>
        <S.OrderInfo>
          <S.OrderDate>{dateHelper.changeLocalDate(date)}</S.OrderDate>
          {page !== 'detail' && <S.MoveDetailPage onClick={moveOrderDetail}>상세보기 ⟩</S.MoveDetailPage>}
        </S.OrderInfo>
        <S.OrderItems>
          {displayCartItems().map((cartItem) => {
            return <OrderProduct key={cartItem.id} {...cartItem} />;
          })}
        </S.OrderItems>
      </S.Container>
      {page === 'detail' && <OrderAmount price={price} />}
    </>
  );
}

export default OrderItem;
