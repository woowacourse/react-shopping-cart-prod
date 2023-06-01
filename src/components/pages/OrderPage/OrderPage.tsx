import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import OrderList from '../../order/OrderList/OrderList';
import { ordersQuery } from '../../../recoil/selectors/order';
import empty from '../../../assets/image/empty.png';
import { useNavigate } from 'react-router-dom';
import { ResetButton } from '../../common/ErrorFallback/ErrorFallback';

const OrderPage = () => {
  const orders = useRecoilValue(ordersQuery);
  const navigate = useNavigate();

  return (
    <Container>
      <TitleWrapper>
        <Title>주문 목록</Title>
      </TitleWrapper>
      <Spacer height={28} />
      <OrderListContainer>
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderList
              key={order.id}
              order={order}
              needsDetailButton
              isSummary
            />
          ))
        ) : (
          <ImageContainer>
            <Image src={empty} alt="텅 빈 주문 목록 이미지" />
            <span>주문 내역이 없어요.</span>
            <HomeButton onClick={() => navigate('/')}>주문하러 가기</HomeButton>
          </ImageContainer>
        )}
      </OrderListContainer>
    </Container>
  );
};

export default OrderPage;

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
  color: ${(props) => props.theme.color.black};
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  padding-top: 30px;

  & > span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const Image = styled.img`
  width: 250px;
`;

const HomeButton = styled(ResetButton)`
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  background-color: ${(props) => props.theme.color.primary};
`;
