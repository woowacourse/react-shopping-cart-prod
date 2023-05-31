import { styled } from 'styled-components';
import SummaryPriceInfo from './SummaryPriceInfo/SummaryPriceInfo';
import parcel from '../../../assets/image/parcel.png';

const OrderSummary = () => {
  return (
    <Container>
      <Main>
        <Image src={parcel} />
        <SummaryPriceInfo type="price" name="총 주문금액" price={12340} />
        <SummaryPriceInfo type="points" name="적립 포인트" price={150} />
        <SummaryPriceInfo type="points" name="보유 포인트" price={12490} />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Main = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 14px;
`;

const Image = styled.img`
  width: 290px;
  margin: 0 auto 25px auto;
`;

export default OrderSummary;
