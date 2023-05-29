import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useFetch } from '../../hooks/useFetch';
import { orderItemState, OrderItemType } from '../../store/order';
import { originState } from '../../store/origin';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import OrderItem from '../OrderItem/OrderItem';

const OrderDetailPageSection = () => {
  const { id } = useParams();
  const [, setOrderItem] = useRecoilState(orderItemState);
  const { data, fetchApi, isLoading } = useFetch<OrderItemType>(setOrderItem);
  const origin = useRecoilValue(originState);

  useEffect(() => {
    fetchApi.get(`${origin}order-items/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {data && <OrderItem information={data} isDetail />}
    </div>
  );
};

export default OrderDetailPageSection;
