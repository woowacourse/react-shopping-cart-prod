import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { orderState } from '../recoil/orderAtom';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { CartItem } from '../types/types';

const useOrderProcess = () => {
  const [order, setOrder] = useRecoilState(orderState);
  const [validOrder, setValidOrder] = useState(true);

  useEffect(() => {
    if (!order) {
      const storedOrder = getLocalStorage<CartItem[] | null>('orderItems', null);

      if (storedOrder) {
        setOrder(storedOrder);
      } else {
        setValidOrder(false);
      }
    }
  }, [order, setOrder]);

  if (validOrder && order) setLocalStorage('orderItems', order);

  return { validOrder, order };
};

export default useOrderProcess;
