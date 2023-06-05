import type { ScheduledOrder } from '../../types/product';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../Common/Button';
import {
  checkedCartItemsSelector,
  totalPriceSelector,
} from '../../recoil/checkedProductData';
import { userPointAtom } from '../../recoil/pointData';
import useOrder from '../../hooks/useOrder';

const EstimatedPaymentBox = () => {
  const navigate = useNavigate();
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const { userPoint, minUsagePoint } = useRecoilValue(userPointAtom);

  const { addOrder } = useOrder();
  const [pointInput, setPointInput] = useState('0');

  const totalDeliveryFee = totalProductPrice < 50000 ? 3000 : 0;
  const totalPrice =
    totalProductPrice > 0 && !isNaN(Number(pointInput))
      ? totalProductPrice + totalDeliveryFee - Number(pointInput)
      : 0;

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumbersRegex = /^[0-9\b]+$/;

    if (
      value === '' ||
      (onlyNumbersRegex.test(value) && Number(value) <= userPoint)
    ) {
      setPointInput(value);
      return;
    }
    setPointInput('0');
  };

  const handlePointButton = () => {
    setPointInput(String(userPoint));
  };

  const handleClickOrderButton = () => {
    if (Number(pointInput) < minUsagePoint && Number(pointInput) > 0) {
      alert(`포인트는 ${minUsagePoint}원 이상으로 입력해주세요!`);
      setPointInput('0');
      return;
    }

    if (window.confirm('주문하시겠습니까?')) {
      const newOrder: ScheduledOrder = {
        cartItems: checkedCartItems,
        totalProductPrice,
        totalDeliveryFee,
        usePoint: Number(pointInput),
        totalPrice,
      };
      addOrder(newOrder);

      navigate('/order');
    }
  };

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
          <dt>보유 포인트</dt>
          <dd style={{ color: 'blue' }}>{userPoint.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>사용할 포인트</dt>
          <PointController>
            <PointInput value={pointInput} onChange={handlePointChange} />
            <PointButton onClick={handlePointButton}>전체 사용</PointButton>
          </PointController>
        </EstimatedPaymentInfo>
        <Direction>
          * 포인트는 {minUsagePoint}원 이상부터 사용 가능합니다.
        </Direction>
        <EstimatedPaymentInfo>
          <dt>포인트 사용</dt>
          <dd style={{ color: 'red' }}>
            {pointInput === '0' ? pointInput : -pointInput}원
          </dd>
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
          onClick={handleClickOrderButton}
        />
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 620px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
    width: 330px;
    height: 590px;
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

  @media (max-width: 420px) {
    font-size: 17px;
  }
`;

const Direction = styled.p`
  font-size: 13px;
  color: gray;

  padding-top: 12px;
`;

const PointController = styled.dd`
  display: flex;
  align-items: start;
`;

const PointInput = styled.input`
  width: 100px;
  height: 24px;

  padding-left: 7px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
    width: 70px;
  }
`;

const PointButton = styled.button`
  height: 24px;

  font-size: 11px;

  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: #f1f0f0;

  @media (max-width: 420px) {
    width: 70px;
  }
`;

const OrderButtonWrapper = styled.div`
  padding: 40px 30px 0;
`;

export default EstimatedPaymentBox;
