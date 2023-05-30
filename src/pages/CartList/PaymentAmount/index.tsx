import { useModal } from 'noah-modal';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Button from '@Components/Button';
import HelperMessage from '@Components/HelperMessage';
import SecondaryButton from '@Components/SecondaryButton';

import useOrderItems from '@Hooks/useOrderItems';

import cartItemsAmountState from '@Selector/cartItemsAmountState';
import orderAmountState from '@Selector/orderAmountState';

import * as S from './style';

function PaymentAmount() {
  const { orderAmount, deliveryFee, totalOrderPrice, discountAmount } = useRecoilValue(orderAmountState);
  const cartAmount = useRecoilValue(cartItemsAmountState);
  const { openModal } = useModal();

  const navigate = useNavigate();

  const { orderCartItems } = useOrderItems();

  const handleOrderCartItems = () => {
    orderCartItems(totalOrderPrice);
    navigate('/order-list');
  };

  if (cartAmount === '0') return <></>;

  return (
    <S.Container>
      <S.Title aria-label="결제 예상 금액">결제 예상 금액</S.Title>
      <S.ExpectedAmountLayout>
        <S.AmountWrapper aria-label="총 상품가격">
          <S.AmountCategory>총 상품가격</S.AmountCategory>
          <S.Amount>{orderAmount}</S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="할인가격">
          <S.AmountCategory>
            <HelperMessage
              text="할인가격"
              message="10만원 이상 구매시 1%, 30만원 이상 구매시 3%, 50만원 이상 구매시 5%의 할인이 적용됩니다."
            />
          </S.AmountCategory>
          <S.Amount>{discountAmount}</S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="쿠폰적용">
          <S.AmountCategory>쿠폰적용</S.AmountCategory>
          <S.Amount>
            <SecondaryButton text="쿠폰 선택" onClick={() => openModal('useCoupon')} />
          </S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="총 배송비">
          <S.AmountCategory>총 배송비</S.AmountCategory>
          <S.Amount>{deliveryFee}</S.Amount>
        </S.AmountWrapper>
        <S.AmountWrapper aria-label="총 주문가격">
          <S.AmountCategory>총 주문가격</S.AmountCategory>
          <S.Amount>{totalOrderPrice}</S.Amount>
        </S.AmountWrapper>
        <Button
          backgroundColor="#22a6a2"
          text="주문하기"
          onClick={handleOrderCartItems}
          disable={orderAmount === '0 원'}
        />
      </S.ExpectedAmountLayout>
    </S.Container>
  );
}

export default PaymentAmount;
