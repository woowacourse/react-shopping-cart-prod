import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import PointsInput from '../PointsInput/PointsInput';
import usePurchaseChecker from './usePurchaseChecker';
import colors from '../../../colors';

const CartTotal = () => {
  const { cartPrice, finalPrice, isPurchasePossible, buttonMessage } =
    usePurchaseChecker();

  return (
    <Container>
      <TitleWrapper>
        <Title>결제예상금액</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Detail>
        <PriceWrapper>
          <dt>총 상품가격</dt>
          <dd>{cartPrice}</dd>
        </PriceWrapper>
        <Spacer height={19} />
        <PriceWrapper>
          <dt>포인트</dt>
          <PointsInput />
        </PriceWrapper>
        <Spacer height={41} />
        <PriceWrapper>
          <dt>총 주문금액</dt>
          <dd>{finalPrice}</dd>
        </PriceWrapper>
      </Detail>
      <Spacer height={43} />
      <OrderButton disabled={!isPurchasePossible}>{buttonMessage}</OrderButton>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 130px;
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 410px;
  border: 1px solid ${colors.transparentGold};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 81px;
  border-bottom: 3px solid ${colors.transparentGold};
  padding: 0 30px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: normal;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${colors.gold};
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > dt,
  dd {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.5px;
    color: ${colors.lightGold};
  }
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  margin: 0 auto;
  background: ${colors.gold};
  font-size: 24px;
  line-height: 21px;
  text-align: center;
  color: ${colors.pureBlack};

  &:disabled {
    background-color: ${colors.transparentGold};
  }
`;

export default CartTotal;
