import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import orderDetailState from '../globalState/atoms/orderDetail';
import OrderDetail from '../components/order/OrderDetail/OrderDetail';
import Colors from '../constant/Colors';

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const orderDetail = useRecoilValue(orderDetailState);

  useEffect(() => {
    if (orderDetail === null) navigate('/');
  }, []);

  return (
    <Layout>
      <Title>주문 상세 내역</Title>
      {orderDetail ? (
        <OrderDetail
          actualPrice={orderDetail.actualPrice}
          cartItems={orderDetail.cartItems}
          deliveryFee={orderDetail.deliveryFee}
          id={orderDetail.id}
          originalPrice={orderDetail.originalPrice}
          showPayments
        />
      ) : null}
    </Layout>
  );
};

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 0 60px 0;

  & > *:last-child {
    padding: 30px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  margin-bottom: 60px;

  border-bottom: 4px solid ${Colors.grey1};
  text-align: center;
`;

export default OrderDetailPage;
