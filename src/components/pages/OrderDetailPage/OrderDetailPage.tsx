import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import OrderList from '../../order/OrderList/OrderList';
import { orderQuery } from '../../../recoil/selectors/order';
import Spacer from '../../common/Spacer/Spacer';
import { formatPrice } from '../../../utils/formatPrice';
import { savedPointByOrderQuery } from '../../../recoil/selectors/point';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate('/error');

    return <></>;
  }

  const orderId = Number(id);
  const order = useRecoilValue(orderQuery(orderId));
  const { price } = order;
  const savedPointByOrder = useRecoilValue(savedPointByOrderQuery(orderId));

  return (
    <Container>
      <Inner>
        <TitleWrapper>
          <Title>주문 내역 상세</Title>
        </TitleWrapper>
        <Spacer height={28} />
        <OrderList order={order} />
        <Spacer height={30} />
        <OrderTotal>
          <OrderTotalHeader>결제금액 정보</OrderTotalHeader>
          <Detail>
            <DetailInner>
              <dt>총 결제금액</dt>
              <dd>{formatPrice(price)}</dd>
            </DetailInner>
            <DetailInner>
              <dt>적립된 포인트</dt>
              <dd>+ {formatPrice(savedPointByOrder)}</dd>
            </DetailInner>
          </Detail>
        </OrderTotal>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    align-items: center;
  }
`;

const Inner = styled.div`
  width: 100%;

  @media only screen and (max-width: 1200px) {
    width: 700px;
  }

  @media only screen and (max-width: 768px) {
    width: 400px;
  }

  @media only screen and (max-width: 600px) {
    width: 300px;
  }
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
  color: ${(props) => props.theme.BLACK};
`;

const OrderTotal = styled.dl`
  width: 360px;
  height: 200px;
  margin-left: auto;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.GRAY_300};

  @media only screen and (max-width: 1200px) {
    margin: 0 auto;
  }

  @media only screen and (max-width: 600px) {
    width: 300px;
  }
`;

const OrderTotalHeader = styled.p`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  height: 70px;
  color: ${(props) => props.theme.color.BLACK};
  background-color: ${(props) => props.theme.color.WHITE};
  border-bottom: 2px solid ${(props) => props.theme.color.GRAY_300};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 30px;
  padding: 25px 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.BLACK};

  & > div:last-child > * {
    font-size: 18px;
  }
`;

const DetailInner = styled.div`
  display: flex;
  justify-content: space-between;

  & > dd {
    color: ${(props) => props.theme.color.PRIMARY};
  }
`;

export default OrderDetailPage;
