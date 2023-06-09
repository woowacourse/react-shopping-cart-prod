import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import EmptyImage from '../../../assets/png/empty-image.png';
import { PATH } from '../../../constants/path';
import { orderListState } from '../../../store/order';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';
import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderList.styles';

const OrderList = () => {
  const orderList = useRecoilValue(orderListState);
  const navigate = useNavigate();

  if (orderList.length === 0) {
    return (
      <S.ListContainer className="center">
        <S.EmptyImage src={EmptyImage} alt="empty" />
        <Text css={S.emptyMessageStyle} size="large">
          주문내역이 없습니다.
        </Text>
        <Button variant="primary" onClick={() => navigate(PATH.ROOT)}>
          홈으로 이동하기
        </Button>
      </S.ListContainer>
    );
  }

  return (
    <S.ListContainer>
      {orderList.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </S.ListContainer>
  );
};

export default OrderList;
