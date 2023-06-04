import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import OrderItem from '../OrderItem/OrderItem';
import PaymentInfo from '../PaymentInfo/PaymentInfo';

const OrderDetailPageSection = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['orders', id],

    queryFn: async () => {
      const response = await fetch(`${origin}/orders/${id}`);

      if (!response.ok) {
        throw new Error(`${response.status} Response was not ok`);
      }

      return response.json();
    },
  });

  return (
    <>
      <OrderItem information={data} isDetail />
      <PaymentInfo totalAmount={data.totalProductAmount} />
    </>
  );
};

export default OrderDetailPageSection;
