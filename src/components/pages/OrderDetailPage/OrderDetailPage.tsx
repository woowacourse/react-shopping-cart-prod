import { styled } from 'styled-components';
import OrderTable from '../../order/OrderTable/OrderTable';
import FullWidthTitle from '../../common/FullWidthTitle/FullWidthTitle';
import colors from '../../../colors';
import { useRecoilValueLoadable } from 'recoil';
import { orderDetailQuery } from '../../../recoil/selectors';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import ErrorComponent from '../../common/Error/ErrorComponent';
import Spinner from '../../common/Spinner/Spinner';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  if (orderId === undefined) {
    throw new Error('주소가 잘못되었습니다.');
  }

  const orderInfo = useRecoilValueLoadable(orderDetailQuery(orderId));

  if (orderInfo.state === 'loading') {
    return <Spinner />;
  }

  if (orderInfo.state === 'hasError') {
    return <ErrorComponent>{orderInfo.contents.message}</ErrorComponent>;
  }

  return (
    <Container>
      <FullWidthTitle>주문 내역 상세</FullWidthTitle>
      <OrderTable orderInfo={orderInfo.contents} />
      <OrderTotal>
        <OrderTotalHeader>결제금액 정보</OrderTotalHeader>
        <OrderTotalPrice>
          <span>총 결제금액</span>
          <span>{formatPrice(orderInfo.contents.price)}</span>
        </OrderTotalPrice>
      </OrderTotal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const OrderTotal = styled.div`
  width: 560px;
  height: 207px;
  margin-left: auto;
  border: 1px solid ${colors.transparentGold};
`;

const OrderTotalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 92px;
  padding: 0 30px;
  background: ${colors.pureBlack};
  border-bottom: 1px solid ${colors.transparentGold};
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: ${colors.gold};
`;

const OrderTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 114px;
  padding: 0 30px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${colors.gold};
  background-color: ${colors.pureBlack};
  border-bottom: ${colors.transparentGold};

  & span {
    color: ${colors.lightGold};
  }
`;

export default OrderDetailPage;
