import { useRecoilValue } from 'recoil';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import useFetch from '../../../hooks/api/useFetch';
import { USER_AUTH_TOKEN } from '../../../constant/user';
import { FetchOrdersResponse } from '../../../types/api';
import useResetCartWhenServerChange from '../../../hooks/useResetCartWhenServerChange';
import OrderItem from '../OrderItem/OrderItem';

const OrderList = () => {
  const serverName = useRecoilValue(serverNameState);
  const ordersUrl = ServerUtil.getOrdersUrl(serverName);

  const { getData, error } = useFetch<FetchOrdersResponse>(ordersUrl, {
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (error) {
    throw error;
  }

  const orderList = getData()?.orders;

  useResetCartWhenServerChange();

  return (
    <>
      {orderList?.map((order) => (
        <li key={order.id}>
          <OrderItem {...order} />
        </li>
      ))}
    </>
  );
};

export default OrderList;
