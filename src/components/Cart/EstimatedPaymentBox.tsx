import type { ScheduledOrder } from '../../types/product';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../Common/Button';
import {
  checkedCartItemsSelector,
  totalPriceSelector,
} from '../../recoil/checkedProductData';

import useOrder from '../../hooks/useOrder';

const EstimatedPaymentBox = () => {
  const navigate = useNavigate();
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const totalProductPrice = useRecoilValue(totalPriceSelector);

  const { addOrder } = useOrder();

  const totalDeliveryFee = totalProductPrice >= 50000 ? 3000 : 0;
  const totalPrice = totalProductPrice
    ? totalProductPrice + totalDeliveryFee
    : 0;
  const usePoint = 4000;

  function handleClickOrderButton() {
    if (window.confirm('주문하시겠습니까?')) {
      const newOrder: ScheduledOrder = {
        cartItems: checkedCartItems,
        totalProductPrice,
        totalDeliveryFee,
        usePoint,
        totalPrice,
      };
      addOrder(newOrder);

      navigate('/order');
    }
  }

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
        <Direction>* 5만원 이상 주문 시 배송비 무료!</Direction>
        <EstimatedPaymentInfo>
          <dt>총 주문금액</dt>
          <dd>{totalPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
      </EstimatedPaymentContent>
      <OrderButtonWrapper>
        <Button
          designType='order'
          buttonLabel='주문하기'
          onClick={handleClickOrderButton}
        />
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 440px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
    width: 330px;
    height: 420px;
  }
`;

const EstimatedPaymentTitle = styled.div`
  height: 81px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 24px;
`;

const EstimatedPaymentContent = styled.div`
  padding: 30px 30px 0;

  & > :last-child {
    padding-top: 41px;
  }
`;

const EstimatedPaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Direction = styled.p`
  font-size: 13px;
  color: gray;

  padding-top: 12px;
`;

const OrderButtonWrapper = styled.div`
  padding: 40px 30px 0;
`;

export default EstimatedPaymentBox;
