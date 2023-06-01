import { useParams } from 'react-router-dom';

import { OrderBox } from '@components/OrderBox/OrderBox';

import { useFetchAsync } from '../../../hooks/useFetchAsync';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const data = useFetchAsync(`orders/${id}`);

  return <OrderBox orderDetailData={data} />;
};
