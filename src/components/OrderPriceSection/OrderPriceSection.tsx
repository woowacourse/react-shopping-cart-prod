import Box from 'components/@common/Box';
import ROUTE_PATH from 'constants/routePath';
import { BASE_SHIPPING_FEE, SHIPPING_FEE_THRESHOLD, PERCENTAGE_OF_EARN_POINTS } from 'constants/policy';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useOrderPointCostContext from 'hooks/useContext/useOrderPointCostContext';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import styled from 'styled-components';

const OrderPriceSection = () => {
  const { checkedCartProductIds } = useCartCheckBox();
  const { pointCost } = useOrderPointCostContext();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPrice(checkedCartProductIds));
  const navigate = useNavigate();

  const isCheckedProductsExist = checkedCartProductIds.size > 0;
  const shippingFee = cartTotalPrice < SHIPPING_FEE_THRESHOLD ? BASE_SHIPPING_FEE : 0;
  const paymentAmount = cartTotalPrice + shippingFee - pointCost;
  const earnPoints = Math.ceil(paymentAmount / PERCENTAGE_OF_EARN_POINTS);

  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `${shippingFee.toLocaleString('ko-KR')}원` : '0원';
  const usedPointsText = `-${pointCost.toLocaleString('ko-KR')}원`;
  const paymentAmountText = isCheckedProductsExist ? `${paymentAmount.toLocaleString('ko-KR')}원` : '0원';
  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedCartProductIds.size}건 주문하기(${paymentAmount.toLocaleString('ko-KR')}원)`
    : '주문하기';

  const earnPointsText = `${earnPoints.toLocaleString('ko-KR')}P 적립 예정`;

  return (
    <Container sizing={{ width: '40%' }} flex={{ flexDirection: 'column' }}>
      <PriceSection sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start', gap: '20px' }}>
        <Title>결제 금액</Title>

        <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
          <SubTitle>총 상품 금액</SubTitle>
          <AmountText>{productTotalPriceText}</AmountText>
        </Box>
        <Box sizing={{ width: '100%' }} flex={{ justify: 'space-between' }}>
          <SubTitle>배송비</SubTitle>
          <AmountText>{shippingFeeText}</AmountText>
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

      <ConfirmButtonBox sizing={{ width: '100%' }}>
        <OrderConfirmButton onClick={() => navigate(ROUTE_PATH.ORDER)} isActive={isCheckedProductsExist}>
          {orderConfirmButtonText}
        </OrderConfirmButton>
      </ConfirmButtonBox>
    </Container>
  );
};

export default OrderPriceSection;

const Container = styled(Box)`
  position: sticky;
  top: 140px;
  margin-top: 60px;
  background-color: var(--color-pure-white);

  @media (max-width: 768px) {
    position: initial;
    bottom: 0;
    width: 100%;
    margin: 0;
  }
`;

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

const ConfirmButtonBox = styled(Box)`
  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

const OrderConfirmButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  color: ${({ isActive }) => (isActive ? 'var(--color-pure-white)' : 'var(--color-grayscale-500)')};
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ isActive }) => (isActive ? 'var(--color-primary-tone-down)' : 'var(--color-grayscale-200)')};
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'initial' : 'none')};
  user-select: none;

  :hover {
    filter: brightness(1.2);
    transition: background-color 100ms ease;
  }

  @media (max-width: 430px) {
    margin: 0;
  }
`;
