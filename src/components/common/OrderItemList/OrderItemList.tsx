import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderItemList.styles';

interface OrderItemListProps {
  detail?: boolean;
}

const OrderItemList: React.FC<OrderItemListProps> = ({ detail }) => {
  return (
    <S.Root>
      <S.Order justify="space-between" align="center">
        <span>주문 번호: 1</span>
        {detail && <S.DetailButton>상세 보기 {'>'}</S.DetailButton>}
      </S.Order>
      <S.ItemList>
        <OrderItem />
      </S.ItemList>
    </S.Root>
  );
};

export default OrderItemList;
