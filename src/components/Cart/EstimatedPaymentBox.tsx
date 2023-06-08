import styled from 'styled-components';
import Button from '../Common/Button';
import useEstimatedPayment from '../../hooks/useEstimatedPayment';
import { XS } from '../../constants/screenSizes';

interface EstimatedPaymentBoxProps {
  usePoint: number;
}

const EstimatedPaymentBox = ({ usePoint }: EstimatedPaymentBoxProps) => {
  const {
    totalProductPrice,
    totalDeliveryFee,
    rewardPoints,
    totalPrice,
    submitOrder,
  } = useEstimatedPayment(usePoint);

  return (
    <EstimatedPaymentBoxContainer>
      <EstimatedPaymentTitle>결제예상금액</EstimatedPaymentTitle>
      <EstimatedPaymentContent>
        <EstimatedPaymentInfo>
          <dt>총 상품가격</dt>
          <dd>{totalProductPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 배송비</dt>
          <dd>{totalDeliveryFee.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 적립 금액</dt>
          <dd>{rewardPoints.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>포인트 사용 금액</dt>
          <dd>{usePoint.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 주문금액</dt>
          <dd>{totalPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
      </EstimatedPaymentContent>
      <OrderButtonWrapper>
        <Button
          designType='order'
          buttonLabel='주문하기'
          onClick={submitOrder}
        />
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 480px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: ${XS}) {
    width: 330px;
    height: 492px;
  }
`;

const EstimatedPaymentTitle = styled.div`
  height: 71px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 20px;
`;

const EstimatedPaymentContent = styled.div`
  padding: 20px 30px 0;

  & > :nth-child(3),
  & > :nth-child(5) {
    padding-top: 41px;
  }
`;

const EstimatedPaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const OrderButtonWrapper = styled.div`
  padding: 40px 30px 0;
`;

export default EstimatedPaymentBox;
