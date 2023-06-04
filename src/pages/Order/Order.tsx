import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchMemberPoint, fetchOrderList } from '../../api/fetcher';
import { OrderList } from '../../components/Order/OrderList';
import useGetQuery from '../../hooks/useGetQuery';
import { FatBorder, PageTitle } from '../../style/style';
import { OrdersResponses, Point } from '../../types/types';
import * as S from './Order.style';
import { memberAuthorization, memberPointState } from '../../recoil/userAtoms';
import { serverState } from '../../recoil/serverAtom';
import { fetchCartList } from '../../api/api';
import { useEffect } from 'react';
import { cartState } from '../../recoil/cartAtoms';

function Order() {
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const setCartList = useSetRecoilState(cartState);
  const setMemberPoint = useSetRecoilState(memberPointState);
  const { data: orders } = useGetQuery<OrdersResponses>({
    fetcher: fetchOrderList({ server, auth: memberAuth }),
  });
  useGetQuery<Point>({
    fetcher: fetchMemberPoint({ server, auth: memberAuth }),
    onSuccess: (point) => setMemberPoint(point),
  });

  const loadCartList = async () => {
    const checkedCartItems = await fetchCartList(server, memberAuth);
    setCartList(checkedCartItems.cartItems);
  };

  useEffect(() => {
    loadCartList();
  }, [server, memberAuth]);

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
