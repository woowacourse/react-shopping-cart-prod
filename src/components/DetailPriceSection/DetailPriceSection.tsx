import Box from 'components/@common/Box';
import { PERCENTAGE_OF_EARN_POINTS } from 'constants/policy';
import styled from 'styled-components';
import { Order } from 'types/order';

type DetailPriceSectionProps = {
  order: Order;
};

const DetailPriceSection = ({ order }: DetailPriceSectionProps) => {
  const { totalPrice, deliveryFee, usedPoint } = order;
  const paymentAmount = totalPrice + deliveryFee - usedPoint;
  const earnPoints = Math.ceil(paymentAmount / PERCENTAGE_OF_EARN_POINTS);

  const totalPriceText = `${totalPrice.toLocaleString('ko-KR')}원`;
  const deliveryFeeText = `${deliveryFee.toLocaleString('ko-KR')}원`;
  const usedPointsText = `${usedPoint.toLocaleString('ko-KR')}원`;
  const paymentAmountText = `${paymentAmount.toLocaleString('ko-KR')}원`;
  const earnPointsText = `${earnPoints.toLocaleString('ko-KR')}P 적립`;

  return (
    <PriceSection sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start', gap: '20px' }}>
      <Title>결제 금액 상세 정보</Title>
      <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
        <SubTitle>총 상품 금액</SubTitle>
        <AmountText>{totalPriceText}</AmountText>
      </Box>
      <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
        <SubTitle>배송비</SubTitle>
        <AmountText>{deliveryFeeText}</AmountText>
      </Box>
      <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
        <SubTitle>포인트 사용</SubTitle>
        <AmountText>{usedPointsText}</AmountText>
      </Box>
      <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column', justify: 'space-between', gap: '6px' }}>
        <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
          <PaymentAmountSubTitle>최종 결제 금액</PaymentAmountSubTitle>
          <PaymentAmountText>{paymentAmountText}</PaymentAmountText>
        </Box>
        <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-end' }}>
          <EarnPointsText>{earnPointsText}</EarnPointsText>
        </Box>
      </Box>
    </PriceSection>
  );
};

export default DetailPriceSection;

const PriceSection = styled(Box)`
  padding: 20px 24px;
  border: 1px solid var(--color-grayscale-200);
  background-color: var(--color-pure-white);
  border-radius: 6px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const SubTitle = styled.span`
  font-size: 16px;
  color: var(--color-grayscale-500);
`;

const PaymentAmountSubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-pure-dark);
`;

const AmountText = styled.span`
  font-size: 16px;
`;

const PaymentAmountText = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary-tone-down);
`;

const EarnPointsText = styled.span`
  font-size: 14px;
  color: var(--color-grayscale-500);
`;
