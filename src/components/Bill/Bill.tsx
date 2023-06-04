import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isSelectedListAtom, totalAmountAtom } from '../../store/cart';
import { WIDTH } from '../../constants/mediaQuery';
import useFetchOrder from '../../hooks/useFetchOrder';
import {
  DELIVERY_FEE,
  DISCOUNT_BOUNDARY,
  DISCOUNT_PERCENT,
  FREE_DELIVERY_BOUNDARY,
} from '../../constants/policy';
import getDiscountAmount from '../../util/getDiscountAmount';

const Bill = () => {
  const isSelectedList = useRecoilValue(isSelectedListAtom);
  const { postOrders } = useFetchOrder();
  const totalProductAmount = useRecoilValue(totalAmountAtom);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const discountAmount = getDiscountAmount(totalProductAmount);
    setDiscount(discountAmount);
    if (totalProductAmount >= FREE_DELIVERY_BOUNDARY) setDeliveryFee(0);
    if (totalProductAmount < FREE_DELIVERY_BOUNDARY)
      setDeliveryFee(DELIVERY_FEE);
  }, [totalProductAmount]);

  const onClickOrder = useCallback(async () => {
    const orders = isSelectedList
      .filter((item) => item.isSelected)
      .map((item) => item.order);
    await postOrders(orders);
  }, [isSelectedList]);

  return (
    <Wrapper>
      <SubTitle>결제예상금액</SubTitle>
      <DetailWrapper>
        <Detail>
          총 상품가격 <span>₩ {totalProductAmount.toLocaleString()}</span>
        </Detail>
        <Detail>
          할인 금액 <span> ₩ {discount.toLocaleString()}</span>
        </Detail>
        <Detail>
          배송비
          <span>₩ {totalProductAmount && deliveryFee.toLocaleString()}</span>
        </Detail>
        <TotalAmount>
          총 주문금액
          <span>
            ₩
            {totalProductAmount &&
              (totalProductAmount - discount + deliveryFee).toLocaleString()}
          </span>
        </TotalAmount>
        <MessageWrapper>
          <Message>
            {DISCOUNT_BOUNDARY / 10000} 만원 이상 주문시 {DISCOUNT_PERCENT} %
            할인
          </Message>
        </MessageWrapper>
        <OrderButton onClick={onClickOrder}>주문하기</OrderButton>
      </DetailWrapper>
    </Wrapper>
  );
};

export default Bill;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 450px;
  width: 448px;
  min-width: 360px;

  border: 1px solid var(--grey-100);
  margin-top: 64px;

  @media (max-width: ${WIDTH.LG}) {
    width: 95vw;
  }
`;

const SubTitle = styled.div`
  width: 100%;

  border-bottom: 1px solid var(--grey-100);

  padding: 22px 30px;

  font-size: 24px;
  font-weight: 200;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;

  width: 100%;

  padding: 32px;

  div {
    font-weight: 200;
  }
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 20px;
  font-weight: bold;
`;

const TotalAmount = styled(Detail)`
  margin: 12px 0 0 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Message = styled.div`
  text-align: right;
  font-size: 15px;

  width: 100%;

  color: #747373;
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--grey-100);

  height: 73px;
  width: 100%;

  font-size: 24px;
  font-weight: 200;

  transition: background-color 0.5s ease;

  &:hover {
    color: #fff;
    background-color: var(--main-bg-color);
  }
`;
