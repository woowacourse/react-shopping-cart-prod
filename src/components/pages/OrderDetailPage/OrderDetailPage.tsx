import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import OrderList from '../../order/OrderList/OrderList';
import { orderQuery } from '../../../recoil/selectors/order';
import Spacer from '../../common/Spacer/Spacer';
import { formatPrice } from '../../../utils/formatPrice';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate('/error');

    return <></>;
  }

  const order = useRecoilValue(orderQuery(Number(id)));
  const { price } = order;

  return (
    <Container>
      <TitleWrapper>
        <Title>주문 내역 상세</Title>
      </TitleWrapper>
      <Spacer height={28} />
      <OrderList order={order} />
      <Spacer height={30} />
      <OrderTotal>
        <OrderTotalHeader>결제금액 정보</OrderTotalHeader>
        <OrderTotalPrice>
          <span>총 결제금액</span>
          <Price>{formatPrice(price)}</Price>
        </OrderTotalPrice>
      </OrderTotal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const TitleWrapper = styled.div`
  height: 40px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.black};
`;

const OrderTotal = styled.div`
  width: 360px;
  height: 160px;
  margin-left: auto;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.gray300};
`;

const OrderTotalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  height: 70px;
  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.color.white};
  border-bottom: 2px solid ${(props) => props.theme.color.gray300};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
`;

const OrderTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  padding: 0 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.black};
`;

const Price = styled.span`
  color: ${(props) => props.theme.color.primary};
`;

export default OrderDetailPage;
