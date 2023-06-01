import useCartItems from '@Hooks/useCartItems';

import * as S from './style';
import OrderDetailSheetLayout from '../OrderDetailSheetLayout';
import OrderSheetItem from '../OrderSheetItem';

function OrderSheetItems() {
  const { selectedCartItem } = useCartItems();

  const selectedCartItemAmount = selectedCartItem.length;

  return (
    <S.Container>
      <OrderDetailSheetLayout title={`주문상품(총 ${selectedCartItemAmount}개)`}>
        <S.OrderSheetItems>
          {selectedCartItem.map((item) => (
            <OrderSheetItem key={item.id} {...item} />
          ))}
        </S.OrderSheetItems>
      </OrderDetailSheetLayout>
    </S.Container>
  );
}

export default OrderSheetItems;
