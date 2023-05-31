import { OrderBox } from '../../OrderBox/OrderBox';
import { PageTitle } from '../../styled/PageTitle';

export const OrderDetailPage = () => {
  return (
    <>
      <PageTitle>주문 내역 상세</PageTitle>
      <ul>
        <OrderBox />
      </ul>
    </>
  );
};
