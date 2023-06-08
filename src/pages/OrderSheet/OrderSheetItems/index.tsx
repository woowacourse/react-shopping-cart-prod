import { useEffect } from 'react';

import useCartItems from '@Hooks/useCartItems';

import * as S from './style';
import OrderDetailSheetLayout from '../OrderDetailSheetLayout';
import OrderSheetItem from '../OrderSheetItem';

type OrderDetailProps = {
  setIsEmptyCartItemsTrue: () => void;
};

function OrderSheetItems({ setIsEmptyCartItemsTrue }: OrderDetailProps) {
  const { selectedCartItem } = useCartItems();

  const selectedCartItemAmount = selectedCartItem.length;

  useEffect(() => {
    if (!selectedCartItem.length) setIsEmptyCartItemsTrue();
  }, []);

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
