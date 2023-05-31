import { useRecoilValue, useSetRecoilState } from 'recoil';
import useMutation from './useMutation';
import { orderState } from '../store/OrderState';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { base64 } from '../constants';

const useOrder = () => {
  const setOrder = useSetRecoilState(orderState);
  const { mutate } = useMutation(setOrder);
  const serverUrl = useRecoilValue(serverState);

  const handleOrderItems = (cartIds: number[], point: number) => {
    mutate(
      {
        url: `${serverUrl}${ORDER_BASE_URL}`,
        method: 'POST',
        bodyData: { cartIds, point },
        headers: {
          Authorization: `basic ${base64}`,
          'content-type': 'application/json',
        },
      },
      ORDER_BASE_URL,
    );
  };

  return { handleOrderItems };
};

export default useOrder;
