import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useFetch } from '../../hooks/useFetch';
import { OrderItemType, orderListState } from '../../store/order';
import { originState } from '../../store/origin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import OrderItem from '../OrderItem/OrderItem';
import styles from './style.module.css';

const OrderList = () => {
  const [, setOrderList] = useRecoilState(orderListState);
  const { data, fetchApi, isLoading } = useFetch<OrderItemType[]>(setOrderList);
  const origin = useRecoilValue(originState);
  useEffect(() => {
    fetchApi.get(`${origin}order-items`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {data?.map((orderItem) => (
        <OrderItem key={orderItem.id} information={orderItem} />
      ))}
    </div>
  );
};

export default OrderList;
