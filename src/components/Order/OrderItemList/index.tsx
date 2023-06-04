import { useNavigate } from 'react-router-dom';
import * as S from './OrderItemList.styles';
import OrderItem from '../OrderItem';
import { Order } from 'types';
import { ROUTES } from 'utils/constants';

const OrderItemList = ({ order }: { order: Order }) => {
  const navigate = useNavigate();

  const onDetailButtonClick = () => {
    navigate(`${ROUTES.ORDER_LIST}/${order.id}`);
  };

  return (
    <S.OrderListWrapper>
      <S.OrderListHeader>
        <p>주문번호 : {order.id}</p>
        <button onClick={onDetailButtonClick}>상세보기 {'>'} </button>
      </S.OrderListHeader>
      {order.orderedItems.map((item) => (
        <OrderItem item={item} />
      ))}
    </S.OrderListWrapper>
  );
};

export default OrderItemList;
