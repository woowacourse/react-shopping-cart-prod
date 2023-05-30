import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';

const OrderPage = () => {
  return (
    <>
      <TitleWrapper>
        <Title>주문 목록</Title>
      </TitleWrapper>
      <Spacer height={28} />
      <OrderListContainer></OrderListContainer>
    </>
  );
};

export default OrderPage;

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid #333;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333;
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
