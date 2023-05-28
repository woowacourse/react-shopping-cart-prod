import { useRecoilCallback } from 'recoil';

import { orderListState } from '../store/order';

const useOrder = () => {
  const refreshOrderList = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(orderListState);
      },
    []
  );

  return { refreshOrderList };
};

export { useOrder };
