import { PageTitle } from '../../styled/PageTitle';
import { OrderBox } from '../../OrderBox/OrderBox';

export const OrdersPage = () => {
  return (
    <>
      <PageTitle>주문 목록</PageTitle>
      <ul>
        <OrderBox />
        <OrderBox />
      </ul>
    </>
  );
};
