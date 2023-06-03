import { useRecoilValue } from 'recoil';
import { fetchOrderList } from '../../api/fetcher';
import { OrderList } from '../../components/Order/OrderList';
import useGetQuery from '../../hooks/useGetQuery';
import { FatBorder, PageTitle } from '../../style/style';
import { OrdersResponses } from '../../types/types';
import * as S from './Order.style';
import { memberAuthorization } from '../../recoil/userAtoms';
import { serverState } from '../../recoil/serverAtom';

function Order() {
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const { data: orders } = useGetQuery<OrdersResponses>({
    fetcher: fetchOrderList({ server, auth: memberAuth }),
  });

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <FatBorder />
      <S.OrderListWrapper>
        {orders && orders.orderResponses.map((order) => <OrderList {...order} />)}
      </S.OrderListWrapper>
    </>
  );
}

export default Order;
