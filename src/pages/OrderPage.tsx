import { styled } from 'styled-components';
import Title from '../components/common/Title';
import OrderItemList from '../components/orderList/OrderItemList';

const OrderPage = () => {
  return (
    <S.Main>
      <Title title='주문 목록' />
      <OrderItemList />
    </S.Main>
  );
};

// TODO: Main 컴포넌트 생성
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
};

export default OrderPage;
