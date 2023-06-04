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
import { PAGE_PATH } from '../../constants/path';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/@common/LoadingSpinner';
import { EmptyCartWrapper } from '../Cart/Cart.style';

function Order() {
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const setCartList = useSetRecoilState(cartState);
  const setMemberPoint = useSetRecoilState(memberPointState);
  const navigate = useNavigate();
  const {
    data: orders,
    loading,
    getData: refreshOrders,
  } = useGetQuery<OrdersResponses>({
    fetcher: () => fetchOrderList({ server, auth: memberAuth }),
  });

  useGetQuery<Point>({
    fetcher: () => fetchMemberPoint({ server, auth: memberAuth }),
    onSuccess: (point) => setMemberPoint(point),
  });

  const loadItemList = async () => {
    await refreshOrders();
    const checkedCartItems = await fetchCartList(server, memberAuth);
    setCartList(checkedCartItems.cartItems);
  };

  useEffect(() => {
    loadItemList();
  }, [server, memberAuth]);

  return (
    <>
      <PageTitle>주문목록</PageTitle>
      <FatBorder />
      <S.OrderListWrapper>
        {loading && (
          <EmptyCartWrapper>
            <LoadingSpinner />
          </EmptyCartWrapper>
        )}
        {orders &&
          orders.orderResponses.length !== 0 &&
          [...orders.orderResponses].reverse().map((order) => <OrderList key={order.orderId} {...order} />)}
        {orders && orders.orderResponses.length === 0 && (
          <S.EmptyOrderWrapper>
            <S.Title>텅</S.Title>
            <S.Description>주문 목록이 없어요.</S.Description>
            <S.HomeButton onClick={() => navigate(PAGE_PATH.HOME)}>상품 구입하러 가기</S.HomeButton>
          </S.EmptyOrderWrapper>
        )}
      </S.OrderListWrapper>
    </>
  );
}

export default Order;
