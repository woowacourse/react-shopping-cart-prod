import { useNavigate } from 'react-router-dom';

import { OrderItemType } from '@Types/index';

import dateHelper from '@Utils/dateHelper';

import * as S from './style';
import OrderAmount from '../OrderAmount';
import OrderProduct from '../OrderProduct';

function OrderItem({ id, date, orderItems, page, price }: OrderItemType & { page?: 'detail' }) {
  const navigate = useNavigate();

  const moveOrderDetail = () => {
    navigate(`/order-list/${id}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const displayOrderItems = () => {
    if (page === 'detail') return orderItems;
    if (orderItems.length < 3) return orderItems;

    return orderItems.slice(0, 2);
  };

  const displayMoveDetailPage = () => {
    if (orderItems.length < 3) return '상세보기 ⟩';

    const remainsProductAmount = orderItems.length - 2;
    return `${remainsProductAmount}개의 상품 더 보기 ⟩`;
  };

  return (
    <>
      <S.Container>
        <S.OrderInfo>
          <S.OrderDate>{dateHelper.changeLocalDate(date)}</S.OrderDate>
          {page !== 'detail' && (
            <S.MoveDetailPage onClick={moveOrderDetail}>{displayMoveDetailPage()}</S.MoveDetailPage>
          )}
        </S.OrderInfo>
        <S.OrderItems>
          {displayOrderItems().map((orderItems) => {
            return <OrderProduct key={orderItems.id} {...orderItems} />;
          })}
        </S.OrderItems>
      </S.Container>
      {page === 'detail' && <OrderAmount price={price} />}
    </>
  );
}

export default OrderItem;
