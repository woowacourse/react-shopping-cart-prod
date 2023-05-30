import { styled } from 'styled-components';
import Title from '../components/common/Title';
import OrderDetail from '../components/orderDetail/OrderDetail';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';

const OrderDetailPage = () => {
  return (
    <MainLayout>
      <Title title='주문 내역 상세' />
      <S.Wrapper>
        <OrderItemList />
        <OrderDetail totalPrice={325000} />
      </S.Wrapper>
    </MainLayout>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
  `,
};

export default OrderDetailPage;
