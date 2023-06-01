import { useParams } from 'react-router-dom';

import { Spinner } from '@components/common/Spinner/Spinner';
import { OrderBox } from '@components/OrderBox/OrderBox';

import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';

import { useQuery } from '@hooks/useQuery';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const baseUrl = useApiBaseUrlValue();
  const { data, loading, error } = useQuery(`${baseUrl}/orders/${id}`);

  return <>{loading ? <Spinner /> : <OrderBox orderDetailData={data} />}</>;
};
