import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { tokenized } from '../../constants';
import { originState } from '../../store/origin';
import OrderItem from '../OrderItem/OrderItem';
import PaymentInfo from '../PaymentInfo/PaymentInfo';

const OrderDetailPageSection = () => {
  const { id } = useParams();
  const origin = useRecoilValue(originState);

  const { data } = useQuery({
    queryKey: ['orders', id],

    queryFn: async () => {
      const response = await fetch(`${origin}orders/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Basic ${tokenized}`,
        },
      });

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
