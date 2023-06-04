import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../../recoil/atoms';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import OrderList from './OrderList';

export default function OrderPageContent() {
  const { orderList } = useOrder();
  const { initCartList } = useCart();
  const host = useRecoilValue(selectedHostState);

  useEffect(() => {
    initCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);
  return <OrderList orders={orderList} />;
}
