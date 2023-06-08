import * as S from './style';
import OrderDetailSheetLayout from '../OrderDetailSheetLayout';

function OrderSheetItemsLoading() {
  return (
    <S.Container>
      <OrderDetailSheetLayout title={`주문상품(총 0개)`}></OrderDetailSheetLayout>
    </S.Container>
  );
}

export default OrderSheetItemsLoading;
