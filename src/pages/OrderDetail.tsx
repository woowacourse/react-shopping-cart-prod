import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { useCart } from '../hooks/useCart';
import { useOrder } from '../hooks/useOrder';
import OrderDetailItem from '../components/order/OrderDetailItem';

export default function OrderDetail() {
  const host = useRecoilValue(selectedHostState);
  const { orderId } = useLocation().state;
  const { orderDetail } = useOrder(orderId);
  const { initCartList } = useCart();

  useEffect(() => {
    initCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  return (
    <Style.Main>
      <Style.Title>주문 내역 상세</Style.Title>
      {orderDetail && <OrderDetailItem orderDetail={orderDetail} />}
    </Style.Main>
  );
}

const Style = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 992px;

    padding: 80px 30px 60px 30px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Title: styled.h2`
    width: 932px;

    border-bottom: 4px solid var(--grey-400);
    padding: 30px 0;
    margin-bottom: 30px;

    font-size: 24px;
    color: var(--grey-400);
    text-align: center;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
