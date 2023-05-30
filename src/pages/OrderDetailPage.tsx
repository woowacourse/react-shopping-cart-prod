import { styled } from 'styled-components';
import Title from '../components/common/Title';
import OrderDetail from '../components/orderDetail/OrderDetail';
import OrderItemList from '../components/orderList/OrderItemList';

const OrderDetailPage = () => {
  return (
    <S.Main>
      <Title title='주문 내역 상세' />
      <S.Wrapper>
        <OrderItemList />
        <OrderDetail totalPrice={325000} />
      </S.Wrapper>
    </S.Main>
  );
};

const S = {
  Main: styled.main`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 1270px) {
      padding: 0 36px;
    }

    @media (max-width: 420px) {
      padding: 0 28px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
  `,
};

export default OrderDetailPage;
