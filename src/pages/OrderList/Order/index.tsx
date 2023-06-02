import { useRecoilValue } from 'recoil';

import orderListState from '@Atoms/orderListState';

import OrderItems from '../OrderItems';

const Order = () => {
  const orderList = useRecoilValue(orderListState);

  return (
    <>
      {orderList?.map((item) => (
        <OrderItems key={item.id} date={item.date} cartItems={item.orderItems} price={item.price} orderId={item.id} />
      ))}
    </>
  );
};

export default Order;
