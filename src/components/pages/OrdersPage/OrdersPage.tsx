import { OrderBox } from '@components/OrderBox/OrderBox';
import { useFetchAsync } from '@hooks/useFetchAsync';

export const OrdersPage = () => {
  const data = useFetchAsync('/orders');
  console.log(data);

  return (
    <ul>
      <OrderBox />
      <OrderBox />
    </ul>
  );
};
