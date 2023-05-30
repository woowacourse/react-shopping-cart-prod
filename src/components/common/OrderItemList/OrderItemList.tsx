import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderItemList.styles';

const OrderItemList = () => {
  return (
    <S.Root>
      <S.Order justify="space-between" align="center">
        <span>주문 번호: 1</span>
        <S.DetailButton>상세 보기 {'>'}</S.DetailButton>
      </S.Order>
      <S.ItemList>
        <OrderItem />
      </S.ItemList>
    </S.Root>
  );
};

export default OrderItemList;
