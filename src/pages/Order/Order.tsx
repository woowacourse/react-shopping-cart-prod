import { OrderList } from '../../components/OrderList';
import { FatBorder, PageTitle } from '../../style/style';

function Order() {
  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <FatBorder />
      <OrderList />
    </>
  );
}

export default Order;
