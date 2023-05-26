import { useRecoilValue } from 'recoil';
import { ordersSelector } from '../../atoms/orders';

const OrderList = () => {
  const orders = useRecoilValue(ordersSelector);

  return <div></div>;
};

export default OrderList;
