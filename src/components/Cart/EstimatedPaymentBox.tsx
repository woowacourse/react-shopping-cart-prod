import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Common/Button';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/checkedProductData';
import {
  FREE_DELIVERY_THRESHOLD,
  REWARD_POINT_RATE,
  STANDARD_DELIVERY_FEE,
} from '../../constants/price';

interface EstimatedPaymentBoxProps {
  userUsedPoint: number;
}

const EstimatedPaymentBox = ({ userUsedPoint }: EstimatedPaymentBoxProps) => {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const deliveryPrice =
    totalPrice === 0 || totalPrice >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const orderPrice = totalPrice ? totalPrice + deliveryPrice : 0;
  const rewardPoints = totalPrice * REWARD_POINT_RATE;

  return (
    <EstimatedPaymentBoxContainer>
      <EstimatedPaymentTitle>결제예상금액</EstimatedPaymentTitle>
      <EstimatedPaymentContent>
        <EstimatedPaymentInfo>
          <dt>총 상품가격</dt>
          <dd>{totalPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 배송비</dt>
          <dd>{deliveryPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 적립 금액</dt>
          <dd>{rewardPoints.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>포인트 사용 금액</dt>
          <dd>{userUsedPoint.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 주문금액</dt>
          <dd>{orderPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
      </EstimatedPaymentContent>
      <OrderButtonWrapper>
        <Link to={'/orders'}>
          <Button designType='order' buttonLabel='주문하기' />
        </Link>
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 480px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
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
