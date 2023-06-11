import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ORDER_STATUS } from '../constants';
import { ORDER_URL } from '../constants/url';
import { serverState } from '../recoil';
import { OrderListItem } from '../types';
import { useFetchData } from './useFetchData';

export const useCancelOrder = ({
  orderStatus,
  orderId,
}: Pick<OrderListItem, 'orderStatus' | 'orderId'>) => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const [changedStatus, setChangedStatus] = useState(orderStatus);

  const handleOrderCancel = () => {
    api
      .patch(`${server}${ORDER_URL}/${orderId}`)
      .then(() => {
        setChangedStatus(ORDER_STATUS.CANCEL);
      })
      .catch((error) => alert(error.message));
  };

  return { changedStatus, handleOrderCancel };
};
