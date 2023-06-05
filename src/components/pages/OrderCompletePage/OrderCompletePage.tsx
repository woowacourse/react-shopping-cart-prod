import { styled } from 'styled-components';
import FullWidthTitle from '../../common/FullWidthTitle/FullWidthTitle';
import Spacer from '../../common/Spacer/Spacer';
import OrderSummary from '../../order/OrderSummary/OrderSummary';

const OrderCompletePage = () => {
  return (
    <Container>
      <FullWidthTitle>주문이 완료되었습니다. 감사합니다!</FullWidthTitle>
      <Spacer height={40} />
      <OrderSummary />
    </Container>
  );
};

const Container = styled.div``;

export default OrderCompletePage;
