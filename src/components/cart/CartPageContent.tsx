import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../../recoil/atoms';
import { useCart } from '../../hooks/useCart';
import CartList from './CartList';

export default function CartPageContent() {
  const host = useRecoilValue(selectedHostState);
  const { initCartList } = useCart();

  useEffect(() => {
    initCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  return <CartList />;
}
