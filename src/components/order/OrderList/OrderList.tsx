import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import EmptyImage from '../../../assets/png/empty-image.png';
import { PATH } from '../../../constants/path';
import { orderListState } from '../../../store/order';
import Button from '../../common/Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderList.styles';

const OrderList = () => {
  const orderList = useRecoilValue(orderListState);
  const navigate = useNavigate();

  if (orderList.length === 0) {
    return (
      <S.OrderListContainer className="center">
        <S.OrderListEmptyImage src={EmptyImage} alt="empty" />
        <S.OrderListEmptyMessage size="large">주문내역이 없습니다.</S.OrderListEmptyMessage>
        <Button variant="primary" onClick={() => navigate(PATH.ROOT)}>
          홈으로 이동하기
        </Button>
      </S.OrderListContainer>
    );
  }

  return (
    <S.OrderListContainer>
      {orderList.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </S.OrderListContainer>
  );
};

export default OrderList;
